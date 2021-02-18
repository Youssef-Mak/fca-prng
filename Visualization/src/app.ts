import P5 from "p5";
// import "p5/lib/addons/p5.dom";
import { ElementaryCellularAutomata } from "./ECA/ECA";

let eca: ElementaryCellularAutomata;
const resolution: number = 10;
let cols: number;
let rows: number;
let rule: any;
let grid: string[];

// Creating the sketch itself
const sketch = (p5: P5) => {

	// The sketch setup method 
	p5.setup = () => {
		// Creating and positioning the canvas
		const canvas = p5.createCanvas(600, 600);
		canvas.parent("app");

    cols = p5.width / resolution;
    rows = p5.height / resolution;

    rule = p5.createSlider(1, 255, 3, 1);
    rule.position(10, 10);
    rule.style("width", "80px");
    rule.input(mySelectEvent);



    eca = new ElementaryCellularAutomata(+rule.value(), cols);

    grid = new Array(rows);
    grid[0] = eca.getState();
	};

  const mySelectEvent = () => {
    const ruleTitle = document.getElementById("rule")!;
    ruleTitle.textContent = "Rule Number " + rule.value();

    grid = new Array(rows);
    eca = new ElementaryCellularAutomata(+rule.value(), cols);

    grid[0] = eca.getState();
  }

	// The sketch draw method
	p5.draw = () => {
    p5.background(0);
    p5.frameRate(5);

    for (let i = 0; i < rows; i++) {
      let state: string = eca.getState();
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
	};
};

new P5(sketch);

