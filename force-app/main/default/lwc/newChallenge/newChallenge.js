import { api, LightningElement, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";
import getOpenCases from "@salesforce/apex/ChallengeController.getOpenCases";
import updateCases from "@salesforce/apex/ChallengeController.updateCases";
import createCase from "@salesforce/apex/ChallengeController.createCase";

const COLUMNS = [
  { label: "Account Name", fieldName: "AccountId", editable: true },
  { label: "Status", fieldName: "Status", editable: true },
  { label: "Origin", fieldName: "Origin", type: "text", editable: true },
  { label: "Priority", fieldName: "Priority", type: "text", editable: true }
];

export default class NewChallenge extends LightningElement {
  cases;
  error;
  draftValues = [];
  columns = COLUMNS;

  @wire(getOpenCases)
  wiredCases({ data, error }) {
    if (data) {
      this.cases = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.cases = undefined;
    }
  }

  async handleSave(event) {
    const records = event.detail.draftValues.map((draft) => ({
      fields: { ...draft }
    }));
    this.draftValues = [];

    try {
      await updateCases(records);
      this.showToast("Success", "Cases updated successfully!", "success");
      await refreshApex(this.cases);
    } catch (error) {
      this.showToast(
        "Error",
        "Error updating cases: " + error.body.message,
        "error"
      );
    }
  }

  async handleCreate() {
    const newCase = await createCase("0012w00000kRdfg", "New", "Phone", "High");
    this.cases = [...this.cases, newCase];
    this.showToast("Success", "New case created successfully!", "success");
  }

  showToast(title, message, variant) {
    this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
  }
}
