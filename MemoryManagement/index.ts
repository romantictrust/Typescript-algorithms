import fs from "fs";
import { performance } from "perf_hooks";
import FF from "./FirstFit";
import FFS from "./FirstFitSorted";
import BF from "./BestFit";
import NF from "./NextFit";

const FILE_PATH_BF = `./MemoryManagement/output/tableBF.txt`;
const FILE_PATH_FF = `./MemoryManagement/output/tableFF.txt`;
const FILE_PATH_FFS = `./MemoryManagement/output/tableFFS.txt`;
const FILE_PATH_NF = `./MemoryManagement/output/tableNF.txt`;

export default function () {
  const blocks: {
    capacity: number;
    stored: number;
    processList: typeof processes;
  }[] = getFilledBlocks(1000, [1, 1]);
  const processes: {
    id: number;
    size: number;
    isDistributed: boolean;
  }[] = getFilledProcesses(1000, [0, 1]);

  blocks.map((p) => Object.freeze(p));
  processes.map((p) => Object.freeze(p));

  new Promise((resolve) => {
    let blocksCopy = deepCopy(blocks);
    let processesCopy = deepCopy(processes);
    let algorithmName = "BestFit";
    let perfomanceResult = performanceWrapper(
      BF,
      {
        blocksCopy,
        processesCopy,
      },
      algorithmName
    );
    resolve({
      result: perfomanceResult.result,
      filePath: FILE_PATH_BF,
      name: algorithmName,
      performanceTime: perfomanceResult.performanceTime,
    });
  }).then((resolve) => processResolve(resolve));

  new Promise((resolve) => {
    let blocksCopy = deepCopy(blocks);
    let processesCopy = deepCopy(processes);
    let algorithmName = "FirstFit";
    let perfomanceResult = performanceWrapper(
      FF,
      {
        blocksCopy,
        processesCopy,
      },
      algorithmName
    );
    resolve({
      result: perfomanceResult.result,
      filePath: FILE_PATH_FF,
      name: algorithmName,
      performanceTime: perfomanceResult.performanceTime,
    });
  }).then((resolve) => processResolve(resolve));

  new Promise((resolve) => {
    let blocksCopy = deepCopy(blocks);
    let processesCopy = deepCopy(processes);
    let algorithmName = "NextFit";
    let perfomanceResult = performanceWrapper(
      NF,
      {
        blocksCopy,
        processesCopy,
      },
      algorithmName
    );
    resolve({
      result: perfomanceResult.result,
      filePath: FILE_PATH_NF,
      name: algorithmName,
      performanceTime: perfomanceResult.performanceTime,
    });
  }).then((resolve) => processResolve(resolve));

  new Promise((resolve) => {
    let blocksCopy = deepCopy(blocks);
    let processesCopy = deepCopy(processes);
    let algorithmName = "FirstFitSorted";
    let perfomanceResult = performanceWrapper(
      FFS,
      {
        blocksCopy,
        processesCopy,
      },
      algorithmName
    );
    resolve({
      result: perfomanceResult.result,
      filePath: FILE_PATH_FFS,
      name: algorithmName,
      performanceTime: perfomanceResult.performanceTime,
    });
  }).then((resolve) => processResolve(resolve));
}

  const processResolve = (resolve: any) => {
    outputResults(resolve.result, resolve.filePath);
    console.log(
      `${resolve.name} completed with time ${resolve.performanceTime.toFixed(
        2
      )}ms`
    );
  };

  const performanceWrapper = (
    algorithmFunc: Function,
    funcProps: any,
    algorithmName: string
  ) => {
    const { blocksCopy, processesCopy } = funcProps;
    let startTime: number = performance.now();
    console.log(`${algorithmName} started`);
    let result = algorithmFunc(blocksCopy, processesCopy);
    let endTime: number = performance.now();
    let performanceTime = endTime - startTime;
    return { result, performanceTime };
  };

  const deepCopy = (originalArray: any) => {
    let copy: any, value, key;

    if (typeof originalArray !== "object" || originalArray === null) {
      return originalArray;
    }
    copy = Array.isArray(originalArray) ? [] : {};
    for (key in originalArray) {
      value = originalArray[key];
      copy[key] = deepCopy(value);
    }

    return copy;
  };

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

  const outputResults = (
    {
      blocks,
      processes,
    }: {
      blocks: {
        capacity: number;
        stored: number;
        processList: typeof processes;
      }[];
      processes: { id: number; size: number; isDistributed: boolean }[];
    },
    outputFilePath: string
  ) => {
    fs.createWriteStream(outputFilePath);
    let filledBlocks: number = 0;
    let notDistributedProcesses = 0;

    let logger = fs.createWriteStream(outputFilePath, {
      flags: "a", // 'a' means appending (old data will be preserved)
    });

    blocks.map((block) => block.processList.length && filledBlocks++);

    logger.write(`Amount of filled blocks: ${filledBlocks}\n`);

    processes.map(
      (process) => !process.isDistributed && notDistributedProcesses++
    );

    logger.write(
      `Amount of undistributed processes: ${notDistributedProcesses}\n`
    );

    logger.write(`Blocks:\n`);

    blocks.map((block) => {
      block.stored = +block.stored.toFixed(2);
      return logger.write(`${JSON.stringify(block)} \n`);
    });

    // logger.write(`\nThose processes were not distributed:\n`);

    // processes.map(
    //   (process) =>
    //     !process.isDistributed && logger.write(`${JSON.stringify(process)} \n`)
    // );
  };
