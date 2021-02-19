import {ElementaryCellularAutomata, State} from "../ECA/ECA";

export type Term = (p: number, r: number, q: number) => number;

export class FuzzyCellularAutomata extends ElementaryCellularAutomata {
  dnf: Term;
  dnfTerms: Term[];
  static readonly dnfEntries: Record<string, Term> = {
    "000": (p: number, r: number, q: number) => {return (1-p)*(1-r)*(1-q)},
    "001": (p: number, r: number, q: number) => {return (1-p)*(1-r)*(q)},
    "010": (p: number, r: number, q: number) => {return (1-p)*(r)*(1-q)},
    "011": (p: number, r: number, q: number) => {return (1-p)*(r)*(q)},
    "100": (p: number, r: number, q: number) => {return (p)*(1-r)*(1-q)},
    "101": (p: number, r: number, q: number) => {return (p)*(1-r)*(q)},
    "110": (p: number, r: number, q: number) => {return (p)*(r)*(1-q)},
    "111": (p: number, r: number, q: number) => {return (p)*(r)*(q)},
  };

  constructor(rule_number: number, size: number = 10) {
    super(rule_number, size);
    this.state = (this.state as string).split('').map(s=>+s);
    this.state[30] = 0.5;
    this.previous = [];
    this.dnfTerms = Object.keys(this.rule).filter(key => this.rule[key] === "1").map(entry => FuzzyCellularAutomata.dnfEntries[entry]);
    this.dnf = this.generateDNF();
  }

  public generateDNF(): Term {
    return (p: number, r: number, q: number) => {
      let res: number = 0;
      for (let term of this.dnfTerms) {
        res += term(p, r, q); 
      }
      return res;
    }
  }

  public getState(): State {
    return this.state;
  }

  public getPrevious(): State {
    return this.previous;
  }

  public nextIteration(): State {
    let newState = [];
    for (let i = 0; i < this.state.length; i++) {
      // Wolfram Neighboorhood
      let max = i + 1;
      let min = i - 1;
      let maxElem = (max == this.state.length) ? this.state[0] : this.state[max];
      let minElem = (min == -1) ? this.state[this.state.length - 1] : this.state[min];
      let [p, q, r] = [minElem, this.state[i], maxElem];
      newState.push(this.dnf(+p, +q, +r));
    }
    this.previous = this.state;
    this.state = newState;
    return this.state;
  }
}

