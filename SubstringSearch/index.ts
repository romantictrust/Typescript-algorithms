import { performance } from "perf_hooks";
import fs from "fs";
import KMP from "./KMP";
import BM from "./BM";
import RK from "./RK";

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
    const output = KMP(fileContentLines, subString);
    const endTime: number = performance.now();
    resolve({ startTime, endTime, name: `KMP`, output });
  });

  const BMasync = new Promise((resolve) => {
    console.log(`>> BM starts <<`);
    const startTime: number = performance.now();
    const output = BM(fileContentLines, subString);
    const endTime: number = performance.now();
    resolve({ startTime, endTime, name: `BM`, output });
  });

  const RKasync = new Promise((resolve) => {
    console.log(`>> RK starts <<`);
    const startTime: number = performance.now();
    const output = RK(fileContentLines, subString);
    const endTime: number = performance.now();
    resolve({ startTime, endTime, name: `RK`, output });
  });

  Promise.all([BMasync, KMPasync, RKasync]).then((resolve: any) => {
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
