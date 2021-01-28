import P5 from "p5";
// import "p5/lib/addons/p5.dom";


// Creating the sketch itself
const sketch = (p5: P5) => {

	// The sketch setup method 
	p5.setup = () => {
		// Creating and positioning the canvas
		const canvas = p5.createCanvas(200, 200);
		canvas.parent("app");

		// Configuring the canvas
		p5.background("black");

	};

	// The sketch draw method
	p5.draw = () => {
	};
};

new P5(sketch);

