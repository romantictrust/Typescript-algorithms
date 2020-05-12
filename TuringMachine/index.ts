import { Subscription } from "rxjs";
import fs from "fs";
import Event from "./event";
import { EventType } from "./event-type";
import StateManager from "./state-manager";
import Tape from "./tape";
import TuringMachine from "./turing-machine";

const stateManager = new StateManager();
const tape: Tape = new Tape();
const stepDelay: number = 150;
const turingMachine: TuringMachine = new TuringMachine(tape, stateManager, stepDelay);

export default () => {
  let pointArrow: string[] = [];

  // 1.11. Г={a,b,c}. Заменить в P каждое вхождение ab на c.
  // const word: string = "cababc";
  // const instructionsUrl: string = "./TuringMachine/input/instructions1_11.json";

  // 2.12. Г={a,b}. Приписать справа к слову P столько палочек, сколько всего символов входит в P (например: babb → babb||||).
  const word: string = "babb";
  const instructionsUrl: string = "./TuringMachine/input/instructions2_12.json";

  // Create a Subscription, which will observe each event (ex. move) on the tape
  const subscription: Subscription = turingMachine
    .observeState()
    .subscribe((event: Event) => {
      if (event.type === EventType.TAPE_MOVE) {
        pointArrow.fill(" ", 0, tape.word.length);
        pointArrow[tape.currentIndex] = "↓";
        console.log(pointArrow.join(""));
        console.log(event.payload.tape["_tape"].join(""));
      } else if (event.type === EventType.SYMBOL_READ) {
        // console.log(event.payload.symbol);
      }
      if (event.type == EventType.FINISHED)
        console.log(`>> Program finished <<`);
    });

  // Get instructions as a string from the .json file
  const instructionsJson: string = fs.readFileSync(instructionsUrl, "utf8");

  // Parse instructions from string to object
  const instructions = JSON.parse(instructionsJson);

  // Load & Run TM
  turingMachine.reset();
  turingMachine.loadWord(word);
  turingMachine.loadProgram(instructions);
  turingMachine.run();
};
