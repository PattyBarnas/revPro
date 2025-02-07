import { createElement } from "lwc";
import CaseForm from "c/caseForm";
import getOpenCases from "@salesforce/apex/challengeController.getOpenCases";
import { createApexTestWireAdapter } from "@salesforce/sfdx-lwc-jest";

const getOpenCasesAdapter = createApexTestWireAdapter(jest.fn());

jest.mock(
  "@salesforce/apex/challengeController.getOpenCases",
  () => {
    return { default: jest.fn() };
  },
  { virtual: true }
);

describe("c-case-form", () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    jest.clearAllMocks();
  });

  it("renders lightning-datatable with data when getOpenCases wire returns records", async () => {
    const element = createElement("c-case-form", {
      is: CaseForm
    });
    document.body.appendChild(element);

    const mockCases = [
      { Id: "001", Status: "Open", Origin: "Phone", Priority: "High" },
      { Id: "002", Status: "In Progress", Origin: "Email", Priority: "Medium" }
    ];
    getOpenCasesAdapter.emit(mockCases);

    await Promise.resolve();

    const datatable = element.shadowRoot.querySelector("lightning-datatable");
    // expect(datatable).not.toBeNull();
    expect(datatable.data).toEqual(mockCases);
  });

  it("displays error message when wire adapter returns an error", async () => {
    const element = createElement("c-case-form", {
      is: CaseForm
    });
    document.body.appendChild(element);

    getOpenCasesAdapter.error(new Error("Mock error"));

    await Promise.resolve();

    const errorDiv = element.shadowRoot.querySelector(".slds-text-color_error");
    expect(errorDiv).not.toBeNull();
    expect(errorDiv.textContent).toBe("Error loading cases: Mock error");
  });
});
