import { performance } from "perf_hooks";
import fs from "fs";
import KMP from "./KMP";
import BM from "./BM";

export default function () {
  console.log(">> Program starts <<");
  const subString: string = "réserve";
  const fileContent: string = fs.readFileSync(
    "./SubstringSearch/input/WarAndPeace.txt",
    "utf8"
  );
  const fileContentLines: string[] = fileContent.split("\n").filter(Boolean);

  const KMPasync = new Promise((resolve) => {
    console.log(`>> KMP starts <<`);
    const startTime: number = performance.now();
    KMP(fileContentLines, subString);
    const endTime: number = performance.now();
    resolve({ startTime, endTime, name: `KMP` });
  });

  const BMasync = new Promise((resolve) => {
    console.log(`>> BM starts <<`);
    const startTime: number = performance.now();
    BM(fileContentLines, subString);
    const endTime: number = performance.now();
    resolve({ startTime, endTime, name: `BM` });
  });

  Promise.all([BMasync, KMPasync]).then((resolve: any) => {
    resolve.map((performance: any) =>
      console.log(
        `>> ${performance.name} ran for ${~~(
          performance.endTime - performance.startTime
        )}ms <<`
      )
    );
  });

  // let subStringsFound: {
  //   line?: number;
  //   index?: number;
  // }[] = BM(fileContentLines, subString);

  // fs.writeFileSync(
  //   "./SubstringSearch/output/linesFoundNumbers.txt",
  //   JSON.stringify(subStringsFound)
  // );
}
