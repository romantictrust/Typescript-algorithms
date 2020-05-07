import { performance } from "perf_hooks";

import SubstringSearch from "./SubstringSearch";

console.log(">> Program starts <<");
const startTime: number = performance.now();
SubstringSearch();
const endTime: number = performance.now();
console.log(`>> Program ran for ${~~(endTime - startTime)}ms <<`);
