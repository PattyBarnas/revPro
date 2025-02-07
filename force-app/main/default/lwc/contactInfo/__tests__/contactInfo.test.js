import { createElement } from "lwc";
import ContactInfo from "c/contactInfo";
import getContact from "@salesforce/apex/challengeController.getContact";
import mockContact from "./data/contactMock.json";

jest.mock(
  "@salesforce/apex/challengeController.getContact",
  () => {
    return {
      default: jest.fn()
    };
  },
  { virtual: true }
);

describe("c-contact-info", () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("renders contact information after fetching data from Apex", async () => {
    // Arrange
    const element = createElement("c-contact-info", {
      is: ContactInfo
    });

    let userInput = "Patryk";

    getContact.mockResolvedValue(mockContact.fields);

    // Act

    document.body.appendChild(element);

    const inputEl = element.shadowRoot.querySelector("lightning-input");

    inputEl.value = userInput;

    inputEl.dispatchEvent(new CustomEvent("change"));

    await Promise.resolve();

    await Promise.resolve();

    // Assert

    const contactName = element.shadowRoot.querySelector(".contact-name");

    expect(contactName).not.toBeNull();

    expect(contactName.textContent).toBe(mockContact.fields.Name);

    const contactPhone = element.shadowRoot.querySelector(".contact-phone");

    expect(contactPhone).not.toBeNull();

    expect(contactPhone.textContent).toBe(mockContact.fields.Phone);

    const contactDep = element.shadowRoot.querySelector(".contact-department");

    expect(contactDep).not.toBeNull();

    expect(contactDep.textContent).toBe(mockContact.fields.Department);
  });
});
