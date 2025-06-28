import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "../ui/journey-form/journey-form";
import "../ui/journey-star-rating/journey-star-rating";
import "../ui/journey-textarea/journey-textarea";
import "../ui/journey-button-submit/journey-button-submit";
import { Required } from "@lion/ui/form-core.js";
import { loadDefaultFeedbackMessages } from "@lion/ui/validate-messages.js";

@customElement("journey-review")
export class JourneyReview extends LitElement {
  static styles = css`
    .write-review-section {
      margin-top: var(--space-2);
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: var(--space-3);

      @media (min-width: 1025px) {
        flex-direction: row;
        align-items: center;
      }
    }

    h3 {
      margin-bottom: var(--space-2);
    }

    journey-textarea {
      width: 100%;

      @media (min-width: 1025px) {
        width: 50%;
      }
    }

    .write-review-textarea[shows-feedback-for~="error"] {
      background-color: #ffd4d4;
    }
  `;

  @property({ type: Number }) itemId!: number;
  @property({ type: Number }) averageRating!: number;
  @state() private rating = 0;
  @state() private isReviewSubmitted = "false";

  constructor() {
    super();
    loadDefaultFeedbackMessages();
  }

  private handleRatingChanged(e: CustomEvent) {
    this.rating = e.detail.value;
  }

  submitHandler = (ev: any) => {
    if (!ev.target.hasFeedbackFor?.includes("error")) {
      ev.currentTarget.resetGroup();

      this.rating = 0;

      fetch(`http://localhost:3000/journeyData/${this.itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numberOfReviews: this.averageRating + 1 }),
      }).then(() => {
        this.isReviewSubmitted = "true";
      });
    }
  };

  public render(): TemplateResult {
    if (this.isReviewSubmitted === "true") {
      return html`<p data-test="thank-you-message">
        Thank you for your review! Refresh the page to see your review here
      </p>`;
    }

    return html` <journey-form @submit="${this.submitHandler}">
      <form>
        <section>
          <h3>How was your experience?</h3>
          <journey-star-rating
            .value=${this.rating}
            @rating-changed=${this.handleRatingChanged}
          ></journey-star-rating>
        </section>

        <section class="write-review-section">
          <journey-textarea
            name="review"
            class="write-review-textarea"
            .validators="${[new Required()]}"
          ></journey-textarea>
          <journey-button-submit>Submit</journey-button-submit>
        </section>
      </form>
    </journey-form>`;
  }
}
