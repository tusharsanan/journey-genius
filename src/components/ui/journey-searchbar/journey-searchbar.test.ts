import { expect } from "chai";
import { fixture, html } from "@open-wc/testing";
import "./journey-searchbar";
import { JourneySearchbar } from "./journey-searchbar";

describe("<journey-searchbar>", () => {
  it("is defined", () => {
    const el = document.createElement("journey-searchbar");
    expect(el).to.be.instanceOf(JourneySearchbar);
  });

  it("should set the correct placeholder text by default", async () => {
    const el = (await fixture(
      html`<journey-searchbar></journey-searchbar>`
    )) as JourneySearchbar;

    const input =
      el.querySelector("input") || el.shadowRoot?.querySelector("input");
    expect(input?.getAttribute("placeholder")).to.equal(
      "Search for a title..."
    );
  });

  it("should set the placeholder text when placeholderText property is set", async () => {
    const el = (await fixture(
      html`<journey-searchbar
        .placeholderText=${"Find a place"}
      ></journey-searchbar>`
    )) as JourneySearchbar;

    const input =
      el.querySelector("input") || el.shadowRoot?.querySelector("input");
    expect(el.getAttribute("placeholder")).to.equal("Find a place");
    expect(input?.getAttribute("placeholder")).to.equal("Find a place");
  });

  it('should have type="search"', async () => {
    const el = (await fixture(
      html`<journey-searchbar></journey-searchbar>`
    )) as JourneySearchbar;

    const input =
      el.querySelector("input") || el.shadowRoot?.querySelector("input");
    expect(input?.getAttribute("type")).to.equal("search");
  });
});
