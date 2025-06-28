import { expect } from "chai";
import { fixture, html } from "@open-wc/testing";
import "./journey-card";
import { JourneyCard } from "./journey-card";

describe("<journey-card>", () => {
  it("is defined", () => {
    const el = document.createElement("journey-card");
    expect(el).to.be.instanceOf(JourneyCard);
  });

  it('should render the "image" slot', async () => {
    const el = (await fixture(
      html`<journey-card><img slot="image" src="test.jpg" /></journey-card>`
    )) as JourneyCard;

    const img = el.querySelector('img[slot="image"]');
    expect(img).to.be.instanceOf(HTMLImageElement);
    expect(img?.getAttribute("src")).to.equal("test.jpg");
  });

  it('should render the "header" slot', async () => {
    const el = (await fixture(
      html`<journey-card><h2 slot="header">Header</h2></journey-card>`
    )) as JourneyCard;

    const header = el.querySelector('h2[slot="header"]');
    expect(header).to.be.instanceOf(HTMLElement);
    expect(header?.textContent).to.equal("Header");
  });

  it("should render default slot content", async () => {
    const el = (await fixture(
      html`<journey-card>Card content</journey-card>`
    )) as JourneyCard;

    expect(el.textContent).to.include("Card content");
  });
});
