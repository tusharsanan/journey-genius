import { expect } from "chai";
import { html, fixture } from "@open-wc/testing";
import "./journey-error";

describe("<journey-error>", () => {
  it("renders slot content inside the <p>", async () => {
    const el = await fixture(
      html`<journey-error>Something went wrong</journey-error>`
    );

    const slot = el.shadowRoot?.querySelector("slot");

    const slotContent = slot!.assignedNodes()[0] as HTMLSlotElement;
    expect(slotContent.textContent).to.include("Something went wrong");
  });
});
