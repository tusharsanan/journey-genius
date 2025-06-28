import sinon from "sinon";
import { JourneyHome } from "./journey-home";

import { expect } from "chai";
import { fixture, html } from "@open-wc/testing";

describe("<journey-home>", () => {
  it("is defined", () => {
    const el = document.createElement("journey-home");
    expect(el).to.be.instanceOf(JourneyHome);
  });

  it('should render the "journey-header" component', async () => {
    const el = (await fixture(
      html`<journey-home></journey-home>`
    )) as JourneyHome;

    const headerComponent = el.shadowRoot?.querySelector("journey-header");
    expect(headerComponent).to.be.instanceOf(HTMLElement);
  });

  it('should render the "journey-searchbar" component', async () => {
    const el = (await fixture(
      html`<journey-home></journey-home>`
    )) as JourneyHome;

    const searchbarComponent =
      el.shadowRoot?.querySelector("journey-searchbar");
    expect(searchbarComponent).to.be.instanceOf(HTMLElement);
  });

  it('should render the "journey-select" component', async () => {
    const el = (await fixture(
      html`<journey-home></journey-home>`
    )) as JourneyHome;

    const selectComponent = el.shadowRoot?.querySelector("journey-select");
    expect(selectComponent).to.be.instanceOf(HTMLElement);
  });

  it('should render the "journey-button-submit" component', async () => {
    const el = (await fixture(
      html`<journey-home></journey-home>`
    )) as JourneyHome;

    const buttonSubmitComponent = el.shadowRoot?.querySelector(
      "journey-button-submit"
    );
    expect(buttonSubmitComponent).to.be.instanceOf(HTMLElement);
  });

  it('should render the "journey-form" component', async () => {
    const el = (await fixture(
      html`<journey-home></journey-home>`
    )) as JourneyHome;

    const formComponent = el.shadowRoot?.querySelector("journey-form");
    expect(formComponent).to.be.instanceOf(HTMLElement);
  });

  it('should call the "submitHandler" method when the form is submitted', async () => {
    const submitHandlerSpy = sinon.spy(JourneyHome.prototype, "submitHandler");

    const el = (await fixture(
      html`<journey-home></journey-home>`
    )) as JourneyHome;

    const journeyForm = el.shadowRoot?.querySelector("journey-form");
    journeyForm?.dispatchEvent(
      new CustomEvent("submit", {
        bubbles: true,
        composed: true,
        detail: {},
      })
    );

    expect(submitHandlerSpy.called).to.be.true;
    submitHandlerSpy.restore();
  });
});
