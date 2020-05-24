const ALPHABET_SYMBOLS: number = 9000;

export default function FindSubstring(linesArr: string[], subString: string) {
  let subStringsFound: {
    line?: number;
    index?: number;
  }[] = [];

  const m: number = subString.length;
  let badchar = badCharHeuristic(subString, m);

  for (let i = 0; i < linesArr.length; i++) {
    const n: number = linesArr[i].length;
    const line: any = linesArr[i];

    /* Fill the bad character array by calling  
        the preprocessing function badCharHeuristic()  
        for given pattern */

    let s: number = 0; // s is shift of the pattern with
    // respect to text
    while (s <= n - m) {
      let j: number = m - 1;

      /* Keep reducing index j of pattern while  
            characters of pattern and text are  
            matching at this shift s */
      while (j >= 0 && subString[j] == line[s + j]) j--;

      /* If the pattern is present at current  
            shift, then index j will become -1 after  
            the above loop */
      if (j < 0) {
        /* Shift the pattern so that the next  
                character in text aligns with the last  
                occurrence of it in pattern.  
                The condition s+m < n is necessary for  
                the case when pattern occurs at the end  
                of text */
        s += s + m < n ? m - badchar[line.charCodeAt(s + m)] : 1;
        subStringsFound.push({ line: i + 1, index: s - m - 1 });
      } else {
        s += Math.max(1, j - badchar[line.charCodeAt(s + j)]);
      }
      /* Shift the pattern so that the bad character  
                in text aligns with the last occurrence of  
                it in pattern. The max function is used to  
                make sure that we get a positive shift.  
                We may get a negative shift if the last  
                occurrence of bad character in pattern  
                is on the right side of the current  
                character. */
    }
  }
  return subStringsFound;
}

function badCharHeuristic(subString: string, size: number) {
  let i: number;
  let badchar: number[] = [];

  // Initialize all occurrences as -1
  for (i = 0; i < ALPHABET_SYMBOLS; i++) badchar[i] = -1;
  // Fill the actual value of last occurrence
  // of a character
  for (i = 0; i < size; i++) {
    badchar[subString.charCodeAt(i)] = i;
  }

  return badchar;
}
