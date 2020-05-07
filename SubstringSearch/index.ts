import fs from "fs";

export default function () {
  const subString: string = "война";
  const fileContent: string = fs.readFileSync(
    "./SubstringSearch/WarAndPeace.txt",
    "utf8"
  );
  const fileContentLines: string[] = fileContent.split("\n").filter(Boolean);
  let subStringsFound: number[] = findSubstringDefaultTool(
    fileContentLines,
    subString
  );

  fs.writeFileSync("./SubstringSearch/linesFoundNumbers.txt", subStringsFound);
}

const findSubstringDefaultTool = (linesArr: string[], subString: string) => {
  let subStringsFound: number[] = [];
  for (let i = 0; i < linesArr.length; i++) {
    if (linesArr[i].includes(subString)) {
      subStringsFound.push(++i);
    }
  }
  return subStringsFound;
};
