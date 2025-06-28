import { JourneyGeniusApp } from "./journey-genius.app";

import { expect } from "chai";
import { fixture, html } from "@open-wc/testing";

describe("<journey-genius-app>", () => {
  it("is defined", () => {
    const el = document.createElement("journey-genius-app");
    expect(el).to.be.instanceOf(JourneyGeniusApp);
  });

  it('should the "journey-home" component', async () => {
    const el = (await fixture(
      html`<journey-genius-app></journey-genius-app>`
    )) as JourneyGeniusApp;

    const homeComponent = el.shadowRoot?.querySelector("journey-home");
    expect(homeComponent).to.be.instanceOf(HTMLElement);
  });
});
