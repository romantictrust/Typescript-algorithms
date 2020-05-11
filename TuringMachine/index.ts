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

  // 1.11. Г={a,b,c}. Заменить в P каждое вхождение ab на c.
  // const word: string = "abbabac";
  // const instructionsUrl: string = "./TuringMachine/input/instructions1_11.json";

  // 2.12. Г={a,b}. Приписать справа к слову P столько палочек, сколько всего символов входит в P (например: babb → babb||||).
  const word: string = "babb"
  const instructionsUrl: string = "./TuringMachine/input/instructions2_12.json";

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
    instructionsUrl,
    "utf8"
  );

  const instructions = JSON.parse(instructionsJson);

  turingMachine.reset();
  turingMachine.loadWord(word);
  turingMachine.loadProgram(instructions);
  turingMachine.run();
};
