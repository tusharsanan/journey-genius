import { expect } from "chai";
import { fixture, html } from "@open-wc/testing";
import "./journey-error";
import { JourneyError } from "./journey-error";

describe("<journey-error>", () => {
  it("is defined", () => {
    const el = document.createElement("journey-error");
    expect(el).to.be.instanceOf(JourneyError);
  });

  it("should render the correct error message", async () => {
    const el = (await fixture(
      html`<journey-error></journey-error>`
    )) as JourneyError;

    const p = el.shadowRoot?.querySelector("p");
    expect(p?.textContent).to.include(
      "There was an error while fetching data. Please try again."
    );
  });
});
