
export type State = string | number[];

export class ElementaryCellularAutomata {
  rule: Record<string, string> = {};
  size: number;
  protected previous: State; 
  protected state: State;

  constructor(rule_number: number, size: number = 10) {
    this.decipherRule(rule_number);
    this.size = size;
    this.previous = "";
    this.state = "";
    for (let i = 0; i < size/2; i++) {
      this.state = this.state + "0";
    }
    this.state = this.state + "1";
    for (let i = size/2; i < size; i++) {
      this.state = this.state + "0";
    }
  }

  public decipherRule(rule_number: number): any {
    let ruleMapping: Record<string, string> = {};
    let binaryRule = (rule_number >>> 0).toString(2);
    // Convert to 8 bit
    while (binaryRule.length != 8) {
      binaryRule = "0" + binaryRule; // Hacky
    }
    for (let i = 0; i < binaryRule.length; i++) {
      let ruleKey: string = ((binaryRule.length - (i + 1)) >>> 0).toString(2)
      while (ruleKey.length != 3) {
        ruleKey = "0" + ruleKey;
      }
      ruleMapping[ruleKey] = binaryRule.charAt(i);
    }
    this.rule = ruleMapping;
  }

  public getState(): State {
    return this.state;
  }

  public getPrevious(): State {
    return this.previous;
  }

  public nextIteration(): State {
    let newState = "";
    for (let i = 0; i < this.state.length; i++) {
      // Wolfram Neighboorhood
      let max = i + 1;
      let min = i - 1;
      let maxElem = (max == this.state.length) ? this.state.charAt(0) : this.state.charAt(max);
      let minElem = (min == -1) ? this.state.charAt(this.state.length - 1) : this.state.charAt(min);
      let neighbourhood = minElem + this.state.charAt(i) + maxElem;
      newState = newState + this.rule[neighbourhood];
    }
    this.previous = this.state;
    this.state = newState;
    return this.state;
  }
}

