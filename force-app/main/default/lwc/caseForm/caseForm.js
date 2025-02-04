import { api, LightningElement } from "lwc";
import createCase from "@salesforce/apex/challengeController.createCase";

export default class CaseForm extends LightningElement {
  async createCase() {
    await createCase({
      status: this.refs.status.value,
      origin: this.refs.origin.value
    });
  }
}
