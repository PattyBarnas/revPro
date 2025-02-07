import { createElement } from "lwc";
import ContactRecord from "c/contactRecord";
import getContactRecord from "@salesforce/apex/challengeController.getContactRecord";
import mockContact from "./data/mockContact.json";

jest.mock(
  "@salesforce/apex/challengeController.getContactRecord",
  () => {
    const { createApexTestWireAdapter } = require("@salesforce/sfdx-lwc-jest");
    return { default: createApexTestWireAdapter(jest.fn()) };
  },
  { virtual: true }
);

describe("c-contact-record", () => {
  afterEach(() => {
    // Reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("renders contact record after fetching data from Apex", async () => {
    // Arrange
    const element = createElement("c-contact-record", {
      is: ContactRecord
    });

    element.recordId = "K1K2K3M4M5M6M7M8M9";

    // const mock = { Id: "K1K2K3M4M5M6M7M8M9", FirstName: "Patryk" };

    getContactRecord.emit(mockContact);

    // Act
    document.body.appendChild(element);

    // Wait for async updates
    await Promise.resolve();
    await Promise.resolve();

    // Assert
    const recordForm = element.shadowRoot.querySelector(
      "lightning-record-edit-form"
    );
    // const recordId = element.shadowRoot.querySelector(".recordId");
    expect(recordForm).not.toBeNull();
    g;
    expect(recordForm.getAttribute("data-record-id")).toBe(
      mockContact.fields.recordId
    );
  });
});
