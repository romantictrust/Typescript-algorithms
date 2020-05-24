import fs from "fs";
import FF from "./FirstFit";
import FFS from "./FirstFitSorted";
import BF from "./BestFit";
import NF from "./NextFit";

const FILE_PATH = `./MemoryManagement/output/table.txt`;

export default function () {
  let blocks: {
    capacity: number;
    stored: number;
    processList: typeof processes;
  }[] = getFilledBlocks(6, [1, 1]);
  let processes: {
    id: number;
    size: number;
    isDistributed: boolean;
  }[] = getFilledProcesses(10, [0, 1]);

  fs.createWriteStream(FILE_PATH);
  outputResults(FFS(blocks, processes));
}

const getFilledBlocks = (
  amount: number,
  capacityrange: number[],
  defaultValues?: number[]
) => {
  let blocks: {
    capacity: number;
    stored: number;
    processList: [];
  }[] = [];

  for (let index = 0; index < amount; index++) {
    blocks.push({
      capacity: defaultValues
        ? defaultValues[index]
        : ~~(
            Math.random() * (capacityrange[1] - capacityrange[0]) +
            capacityrange[0]
          ),
      stored: 0,
      processList: [],
    });
  }
  return blocks;
};

const getFilledProcesses = (
  amount: number,
  capacityrange: number[],
  defaultValues?: number[]
) => {
  let processes: { id: number; size: number; isDistributed: boolean }[] = [];

  for (let index = 0; index < amount; index++) {
    processes.push({
      id: index,
      isDistributed: false,
      size: defaultValues
        ? defaultValues[index]
        : +(
            Math.random() * (capacityrange[1] - capacityrange[0]) +
            capacityrange[0]
          ).toFixed(2),
    });
  }
  return processes;
};

const outputResults = ({
  blocks,
  processes,
}: {
  blocks: {
    capacity: number;
    stored: number;
    processList: typeof processes;
  }[];
  processes: { id: number; size: number; isDistributed: boolean }[];
}) => {
  let logger = fs.createWriteStream(FILE_PATH, {
    flags: "a", // 'a' means appending (old data will be preserved)
  });

  logger.write(`Blocks:\n`);

  blocks.map((block) => {
    block.stored = +block.stored.toFixed(2);
    return logger.write(`${JSON.stringify(block)} \n`);
  });

  logger.write(`\nThose processes were not distributed:\n`);

  processes.map(
    (process) =>
      !process.isDistributed && logger.write(`${JSON.stringify(process)} \n`)
  );
};
