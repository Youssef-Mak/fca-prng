import P5 from "p5";

import ElementaryCellularAutomata, { State } from "./CA/ECA";
import FuzzyCellularAutomata from "./CA/FCA";

let eca: ElementaryCellularAutomata;
let fca: FuzzyCellularAutomata;
const resolution: number = 10;
let cols: number;
let rows: number;
let rule: any;

const sketch = (p5: P5) => {

  p5.setup = () => {
    const canvas = p5.createCanvas(600, 1200);
    canvas.parent("app");

    cols = p5.width / resolution;
    cols = cols * 2;
    rows = p5.height / resolution;
    rows = rows * 2;

    rule = p5.createSlider(1, 255, 3, 1);
    rule.parent("rule");
    rule.style("width", "180px");
    rule.input(mySelectEvent);

    eca = new ElementaryCellularAutomata(+rule.value(), cols / 2);
    fca = new FuzzyCellularAutomata(+rule.value(), cols / 2);
  };

  const mySelectEvent = () => {
    const ruleTitle = document.getElementById("rule-label")!;
    ruleTitle.textContent = "Rule Number " + rule.value();

    eca = new ElementaryCellularAutomata(+rule.value(), cols / 2);
    fca = new FuzzyCellularAutomata(+rule.value(), cols / 2);
  };

  p5.draw = () => {
    p5.background(0);
    p5.frameRate(5);

    for (let i = 0; i < rows; i++) {
      let state: string = eca.getState() as string;
      for (var j = 0; j < state.length; j++) {
        let x: number = i * resolution;
        let y: number = j * resolution;
        if (state.charAt(j) == "1") {
          p5.fill(255);
          p5.stroke(0);
          p5.rect(x, y, resolution - 1, resolution - 1);
        }
      }
      eca.nextIteration();
    }
    for (let i = 0; i < rows; i++) {
      let state: number[] = fca.getState() as number[];
      console.log(state);
      for (var j = 0; j < state.length; j++) {
        let x: number = i * resolution;
        let y: number = j * resolution + (600);
        let color: string = ('000000' + (state[i] * 16777215).toString(16)).slice(-6);
        p5.fill('#' + color);
        p5.stroke(0);
        p5.rect(x, y, resolution - 1, resolution - 1);
      }
      fca.nextIteration();
    }
  };
};

new P5(sketch);

