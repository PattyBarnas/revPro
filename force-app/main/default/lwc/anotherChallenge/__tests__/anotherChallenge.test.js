import { createElement } from "lwc";
import AnotherChallenge from "c/anotherChallenge";

describe("c-another-challenge", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("should update h1 content after button click", async () => {
    // Arrange
    const element = createElement("c-another-challenge", {
      is: AnotherChallenge
    });
    document.body.appendChild(element);

    const input = element.shadowRoot.querySelector("lightning-input");

    input.value = "test";

    input.dispatchEvent(new Event("change"));

    const button = element.shadowRoot.querySelector("lightning-button");

    button.click();

    await Promise.resolve();

    const h1 = element.shadowRoot.querySelector("h1");

    expect(h1.textContent).toBe("test");
  });
});
