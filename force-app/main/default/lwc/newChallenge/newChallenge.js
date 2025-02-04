import { api, LightningElement, wire } from "lwc";
import { refreshApex } from "@salesforce/apex";
import getOpenCases from "@salesforce/apex/ChallengeController.getOpenCases";
import createCase from "@salesforce/apex/ChallengeController.createCase";
import updateCases from "@salesforce/apex/challengeController.updateCases";

const COLUMNS = [
  // { label: "Account Name", fieldName: "AccountId", editable: true },
  { label: "Status", fieldName: "Status", editable: true },
  { label: "Origin", fieldName: "Origin", type: "text", editable: true },
  { label: "Priority", fieldName: "Priority", type: "text", editable: true }
];

export default class NewChallenge extends LightningElement {
  cases;
  error;
  draftValues = [];
  columns = COLUMNS;

  wiredCasesResult;

  @wire(getOpenCases)
  wiredCases(result) {
    this.wiredCasesResult = result;
    if (result.data) {
      this.cases = result.data;
      this.error = undefined;
    } else if (result.error) {
      this.error = result.error;
      this.cases = undefined;
    }
  }

  async createCase() {
    try {
      await createCase({
        status: this.template.querySelector('[data-id="status"]').value,
        origin: this.template.querySelector('[data-id="origin"]').value
      });

      refreshApex(this.wiredCasesResult);
    } catch (error) {
      this.error = error;
    }
  }

  handleSave(event) {
    let draftValues = this.template.querySelector(
      "lightning-datatable"
    ).draftValues;

    updateCases({ casesToUpdate: draftValues }).then((result) => {
      this.template.querySelector("lightning-datatable").draftValues = [];

      return refreshApex(this.wiredCasesResult);
    });
  }
}
