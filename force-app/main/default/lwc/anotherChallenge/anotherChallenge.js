import { LightningElement } from "lwc";

export default class AnotherChallenge extends LightningElement {
  userInput = "";
  output = "";

  handleUserInput(e) {
    this.userInput = e.target.value;
  }

  handleClick() {
    this.output = this.userInput;
  }
}
