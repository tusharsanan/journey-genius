import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "../ui/journey-form/journey-form";
import "../ui/journey-star-rating/journey-star-rating";
import "../ui/journey-textarea/journey-textarea";
import "../ui/journey-button-submit/journey-button-submit";
import { Required } from "@lion/ui/form-core.js";
import { loadDefaultFeedbackMessages } from "@lion/ui/validate-messages.js";
import { notificationStyles } from "../../styles/notification.styles";
import { patchReviews } from "../../services/reviews.service";
import { reviewNotificationsTemplate } from "../../templates/review-notifications-template";

@customElement("journey-review")
export class JourneyReview extends LitElement {
  static styles = [
    notificationStyles,
    css`
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

      .write-review-textarea {
        width: 100%;
        @media (min-width: 1025px) {
          width: 50%;
        }
      }

      .write-review-textarea[shows-feedback-for~="error"] {
        background-color: #ffd4d4;
      }
    `,
  ];

  @property({ type: Number }) itemId!: number;
  @property({ type: Number }) averageRating!: number;
  @state() private rating = 0;
  @state() private isReviewSubmitted = false;
  @state() private isReviewSubmissionFailed = false;

  constructor() {
    super();
    loadDefaultFeedbackMessages();
  }

  private handleRatingChanged(e: CustomEvent): void {
    this.rating = e.detail.value;
  }

  submitHandler = async (ev: any) => {
    if (!ev.target.hasFeedbackFor?.includes("error")) {
      ev.currentTarget.resetGroup();

      this.rating = 0;

      try {
        await patchReviews(this.itemId, this.averageRating);
        this.isReviewSubmitted = true;
      } catch (error) {
        console.error("Error while submitting the review:", error);
        this.isReviewSubmitted = false;
        this.isReviewSubmissionFailed = true;
      }
    }
  };

  public render(): TemplateResult {
    if (this.isReviewSubmitted === true) {
      return reviewNotificationsTemplate(true);
    }

    if (this.isReviewSubmissionFailed) {
      return reviewNotificationsTemplate(false);
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
