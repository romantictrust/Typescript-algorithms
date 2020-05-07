export default function FindSubstring(linesArr: string[], subString: string) {
  let subStringsFound: {
    line?: number;
    index?: number;
  }[] = [];
  let index: number = 0;

  let pf: number[] = GetPrefix(subString);

  for (let j = 0; j < linesArr.length; j++) {
    for (let i = 0; i < linesArr[j].length; i++) {
      while (index > 0 && subString[index] != linesArr[j][i]) {
        index = pf[index - 1];
      }
      if (subString[index] == linesArr[j][i]) index++;
      if (index == subString.length) {
        subStringsFound.push({ line: j + 1, index: i - index + 1 });
      }
    }
  }

  return subStringsFound;
}

function GetPrefix(subString: string) {
  let prefix: number[] = [0];
  let index: number = 0;

  for (let i = 1; i < subString.length; i++) {
    while (index >= 0 && subString[index] != subString[i]) {
      index--;
    }
    index++;
    prefix[i] = index;
  }

  return prefix;
}
