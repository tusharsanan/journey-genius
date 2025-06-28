import { expect } from "chai";
import { fixture, html } from "@open-wc/testing";
import "./journey-section-list";
import { JourneySectionList } from "./journey-section-list";

describe("<journey-section-list>", () => {
  it("is defined", () => {
    const el = document.createElement("journey-section-list");
    expect(el).to.be.instanceOf(JourneySectionList);
  });
  it("renders a list of items", async () => {
    const items = [
      {
        id: 1,
        title: "Hotel California",
        type: "hotel",
        categories: ["luxury"],
      },
      { id: 2, title: "Cafe Paris", type: "cafe", categories: ["coffee"] },
    ] as any;
    const el = await fixture<JourneySectionList>(
      html`<journey-section-list .items=${items}></journey-section-list>`
    );
    const text = el.shadowRoot?.textContent || "";
    expect(text).to.include("Hotel California");
    expect(text).to.include("Cafe Paris");
  });
});
