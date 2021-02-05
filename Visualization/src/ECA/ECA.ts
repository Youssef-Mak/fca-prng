
export class ElementaryCellularAutomata {
  rule: Record<string, string> = {};
  size: number;
  protected previous: string;
  protected state: string;

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
    console.log(rule_number);
    let binaryRule = (rule_number >>> 0).toString(2);
    // Convert to 8 bit
    while (binaryRule.length != 8) {
      binaryRule = binaryRule + "0"; // Hacky
    }
    for (let i = 0; i < binaryRule.length; i++) {
      binaryRule.charAt(i);
      let ruleKey: string = (i >>> 0).toString(2)
      while (ruleKey.length != 3) {
        ruleKey = "0" + ruleKey;
      }
      ruleMapping[ruleKey] = binaryRule.charAt(i);
    }
    // debugger;
    this.rule = ruleMapping;
  }

  public getState(): string {
    return this.state;
  }

  public getPrevious(): string {
    return this.previous;
  }

  public nextIteration(): string{
    let newState = "";
    for (let i = 0; i < this.state.length; i++) {
      // Wolfram Neighboorhood
      let max = i + 1;
      let min = i - 1;
      if (max == this.state.length) { max = 0 };
      if (min == -1) { min = this.state.length - 1 };
      let neighbourhood = this.state.charAt(min) + this.state.charAt(i) + this.state.charAt(max);
      newState = newState + this.rule[neighbourhood];
    }
    this.previous = this.state;
    this.state = newState;
    return this.state;
  }
}

