import { expect } from "chai";
import { fixture, html } from "@open-wc/testing";
import "./journey-header";
import { JourneyHeader } from "./journey-header";

describe("<journey-header>", () => {
  it("is defined", () => {
    const el = document.createElement("journey-header");
    expect(el).to.be.instanceOf(JourneyHeader);
  });

  it("should render a <header> element", async () => {
    const el = (await fixture(
      html`<journey-header></journey-header>`
    )) as JourneyHeader;

    const header = el.shadowRoot?.querySelector("header");
    expect(header).to.be.instanceOf(HTMLElement);
  });

  it("should render the heading with correct text", async () => {
    const el = (await fixture(
      html`<journey-header></journey-header>`
    )) as JourneyHeader;

    const heading = el.shadowRoot?.querySelector(".heading");
    expect(heading).to.be.instanceOf(HTMLElement);
    expect(heading?.textContent).to.equal("Journey genius");
  });
});
