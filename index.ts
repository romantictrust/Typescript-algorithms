import { performance } from "perf_hooks";

import SubstringSearch from "./SubstringSearch";
import TuringMachine from './TuringMachine'

console.log(">> Program starts <<");
const startTime: number = performance.now();
// SubstringSearch();
TuringMachine();
const endTime: number = performance.now();
// console.log(`>> Program ran for ${~~(endTime - startTime)}ms <<`);
