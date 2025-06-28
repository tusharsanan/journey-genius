import sinon from "sinon";
import { expect } from "chai";
import { fixture, html, oneEvent } from "@open-wc/testing";
import "./journey-star-rating";
import { StarRating } from "./journey-star-rating";

describe("<journey-star-rating>", () => {
  it("is defined", () => {
    const el = document.createElement("journey-star-rating");
    expect(el).to.be.instanceOf(StarRating);
  });

  it("should render the correct number of stars", async () => {
    const el = (await fixture(
      html`<journey-star-rating .max=${7}></journey-star-rating>`
    )) as StarRating;

    const stars = el.shadowRoot?.querySelectorAll(".star");
    expect(stars?.length).to.equal(7);
  });

  it("should highlight stars up to the value", async () => {
    const el = (await fixture(
      html`<journey-star-rating .value=${3}></journey-star-rating>`
    )) as StarRating;

    const stars = el.shadowRoot?.querySelectorAll(".star");
    expect(stars?.[0]?.classList.contains("inactive")).to.be.false;
    expect(stars?.[1]?.classList.contains("inactive")).to.be.false;
    expect(stars?.[2]?.classList.contains("inactive")).to.be.false;
    expect(stars?.[3]?.classList.contains("inactive")).to.be.true;
  });

  it('should call "setRating" when a star is clicked', async () => {
    const el = (await fixture(
      html`<journey-star-rating></journey-star-rating>`
    )) as StarRating;

    const setRatingSpy = sinon.spy(el as any, "setRating");
    const stars = el.shadowRoot?.querySelectorAll(".star");
    stars?.[2]?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(setRatingSpy.calledOnceWith(3)).to.be.true;
    setRatingSpy.restore();
  });

  it('should emit "rating-changed" event when a star is clicked', async () => {
    const el = (await fixture(
      html`<journey-star-rating></journey-star-rating>`
    )) as StarRating;

    const stars = el.shadowRoot?.querySelectorAll(".star");
    setTimeout(() =>
      stars?.[1]?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    );
    const event = await oneEvent(el, "rating-changed");
    expect(event).to.exist;
    expect(event.detail.value).to.equal(2);
    expect(el.value).to.equal(2);
  });

  it('should emit "rating-changed" event when Enter is pressed on a star', async () => {
    const el = (await fixture(
      html`<journey-star-rating></journey-star-rating>`
    )) as StarRating;

    const stars = el.shadowRoot?.querySelectorAll(".star");
    setTimeout(() =>
      stars?.[3]?.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
      )
    );
    const event = await oneEvent(el, "rating-changed");
    expect(event.detail.value).to.equal(4);
    expect(el.value).to.equal(4);
  });

  it('should emit "rating-changed" event when Space is pressed on a star', async () => {
    const el = (await fixture(
      html`<journey-star-rating></journey-star-rating>`
    )) as StarRating;

    const stars = el.shadowRoot?.querySelectorAll(".star");

    setTimeout(() =>
      stars?.[0]?.dispatchEvent(
        new KeyboardEvent("keydown", { key: " ", bubbles: true })
      )
    );
    const event = await oneEvent(el, "rating-changed");
    expect(event.detail.value).to.equal(1);
    expect(el.value).to.equal(1);
  });

  it("should set aria-checked correctly", async () => {
    const el = (await fixture(
      html`<journey-star-rating .value=${2}></journey-star-rating>`
    )) as StarRating;

    const stars = el.shadowRoot?.querySelectorAll(".star");
    expect(stars?.[1]?.getAttribute("aria-checked")).to.equal("true");
    expect(stars?.[0]?.getAttribute("aria-checked")).to.equal("false");
  });
});
