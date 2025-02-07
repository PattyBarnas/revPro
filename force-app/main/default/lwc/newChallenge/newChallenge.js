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

  wiredCases;

  @wire(getOpenCases)
  wiredCases(result) {
    this.wiredCases = result;
    if (result.data) {
      this.cases = result.data;
      this.error = undefined;
    } else if (result.error) {
      this.error = result.error;
      this.cases = undefined;
    }
  }

  createNewCase() {
    const status = this.template.querySelector('[data-id="status"]').value;
    const origin = this.template.querySelector('[data-id="origin"]').value;

    if (!status || !origin) {
      this.error = "Please fill in both the status and origin fields.";
      return;
    }

    createCase({ Status: status, Origin: origin })
      .then(() => {
        return refreshApex(this.wiredCases);
      })
      .catch((error) => {
        console.error(error);
        this.error = error.body ? error.body.message : error.message;
      });
  }

  handleSave(event) {
    const draftValues = event.detail.draftValues;

    updateCases({ casesToUpdate: draftValues })
      .then(() => {
        this.template.querySelector("lightning-datatable").draftValues = [];
        return refreshApex(this.wiredCases);
      })
      .catch((error) => {
        this.error = error;
        console.error("Error updating cases:", error);
      });
  }
}
