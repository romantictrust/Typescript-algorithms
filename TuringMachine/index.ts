import { Subscription } from "rxjs";
import fs from "fs";
import Event from "./event";
import { EventType } from "./event-type";
import StateManager from "./state-manager";
import Tape from "./tape";
import TuringMachine from "./turing-machine";

const stateManager = new StateManager();
const tape: Tape = new Tape();
const turingMachine: TuringMachine = new TuringMachine(tape, stateManager);

export default () => {
  let pointArrow: string[] = [];
  const word: string = "abbabac";

  const subscription: Subscription = turingMachine
    .observeState()
    .subscribe((event: Event) => {
      if (event.type === EventType.TAPE_MOVE) {
        pointArrow.fill(" ", 0, word.length);
        pointArrow[event.payload.tape["_index"]] = "↓";
        console.log(pointArrow.join(''));
        console.log(event.payload.tape['_tape'].join(''))
      } else if (event.type === EventType.SYMBOL_READ) {
        // console.log(event.payload.symbol);
      }
    });

  const instructionsJson: string = fs.readFileSync(
    "./TuringMachine/input/instructions1_11.json",
    "utf8"
  );

  const instructions = JSON.parse(instructionsJson);

  turingMachine.reset();
  turingMachine.loadWord(word);
  turingMachine.loadProgram(instructions);
  turingMachine.run();
};
