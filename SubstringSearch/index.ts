import fs from "fs";
import KMP from "./KMP";

export default function () {
  console.log(">> Program starts <<");
  const subString: string = "люблю";
  const fileContent: string = fs.readFileSync(
    "./SubstringSearch/input/WarAndPeace.txt",
    "utf8"
  );
  const fileContentLines: string[] = fileContent.split("\n").filter(Boolean);
  let subStringsFound: {
    line?: number;
    index?: number;
  }[] = KMP(fileContentLines, subString);

  fs.writeFileSync(
    "./SubstringSearch/output/linesFoundNumbers.txt",
    JSON.stringify(subStringsFound)
  );
  console.log(`>> Program finished <<`);
}

// const findSubstringDefaultTool = (linesArr: string[], subString: string) => {
//   let subStringsFound: {
//     line?: number;
//     index?: number;
//   }[] = [];
//   for (let i = 0; i < linesArr.length; i++) {
//     if (linesArr[i].includes(subString)) {
//       subStringsFound.push({ line: i });
//     }
//   }
//   return subStringsFound;
// };
