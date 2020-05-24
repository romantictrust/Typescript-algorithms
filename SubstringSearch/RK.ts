const APHABET_SYMBOLS: number = 9000;

export default function FindSubstring(
  linesArr: string[],
  subString: string,
  q: number = 101
) {
  let subStringsFound: {
    line?: number;
    index?: number;
  }[] = [];

  const m: number = subString.length;

  for (let index = 0; index < linesArr.length; index++) {
    const line: string = linesArr[index];
    const n: number = line.length;
    let i, j: number;
    let p: number = 0; // hash value for pattern
    let t: number = 0; // hash value for txt
    let h: number = 1;

    // The value of h would be "pow(d, M-1)%q"
    for (i = 0; i < m - 1; i++) h = (h * APHABET_SYMBOLS) % q;

    // Calculate the hash value of pattern and first
    // window of text
    for (i = 0; i < m; i++) {
      p = (APHABET_SYMBOLS * p + subString.charCodeAt(i)) % q;
      t = (APHABET_SYMBOLS * t + line.charCodeAt(i)) % q;
    }

    // Slide the pattern over text one by one
    for (i = 0; i <= n - m; i++) {
      // Check the hash values of current window of text
      // and pattern. If the hash values match then only
      // check for characters on by one
      if (p == t) {
        /* Check for characters one by one */
        for (j = 0; j < m; j++) {
          if (line.charCodeAt(i + j) != subString.charCodeAt(j)) break;
        }

        // if p == t and pat[0...M-1] = txt[i, i+1, ...i+M-1]
        if (j == m) subStringsFound.push({ line: index + 1, index: i });
      }

      // Calculate hash value for next window of text: Remove
      // leading digit, add trailing digit
      if (i < n - m) {
        t =
          (APHABET_SYMBOLS * (t - line.charCodeAt(i) * h) +
            line.charCodeAt(i + m)) %
          q;

        // We might get negative value of t, converting it
        // to positive
        if (t < 0) t = t + q;
      }
    }
  }
  return subStringsFound;
}
