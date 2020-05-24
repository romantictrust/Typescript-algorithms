import fs from "fs";
import FF from "./FirstFit";

const FILE_PATH = `./MemoryManagement/output/table.txt`;

export default function () {
  let blockSize: number[] = [100, 500, 200, 300, 600];
  let processSize: number[] = [212, 417, 112, 426];

  fs.createWriteStream(FILE_PATH);
  outputResults(FF(blockSize, processSize));
}

const outputResults = (result: {
  processSize: number[];
  allocation: number[];
}) => {
  var logger = fs.createWriteStream(FILE_PATH, {
    flags: "a", // 'a' means appending (old data will be preserved)
  });

  const tableMargin: string = `\t\t\t\t`;

  logger.write("\nProcess No.\t\tProcess Size\tBlock no.\n");

  console.log(result.allocation);
  for (let i = 0; i < result.processSize.length; i++) {
    logger.write(
      `${i + 1}${tableMargin}${result.processSize[i]}${tableMargin}${
        result.allocation[i] != -1 ? result.allocation[i] + 1 : "Not Allocated"
      }\n`
    );
  }
};
