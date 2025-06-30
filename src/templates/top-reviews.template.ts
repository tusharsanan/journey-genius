import { html, TemplateResult } from "lit";
import { JourneyItem } from "../types/journey-item-types";
import { repeat } from "lit/directives/repeat.js";

export function topReviewsTemplate(selectedItem: JourneyItem): TemplateResult {
  return html`
    <section class="top-reviews">
      <h3>Top reviews</h3>

      ${selectedItem.reviews.length > 0
        ? html`<ul>
            ${repeat(
              selectedItem.reviews,
              (review) => review.id,
              (review) => html`<li>${review.comment}</li>`
            )}
          </ul>`
        : html`<p>No reviews yet.</p>`}
    </section>
  `;
}
