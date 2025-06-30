import { html, TemplateResult } from "lit";
import { JourneyItem } from "../types/journey-item-types";

export function reviewDialogBodyTemplate(
  selectedItem: JourneyItem
): TemplateResult {
  return html`
    <article class="item-container">
      <img
        class="popup-image"
        src="${selectedItem.image}"
        alt="${selectedItem.title}"
      />

      <article class="item-details">
        <h2>${selectedItem.title}</h2>

        <p>${selectedItem.description}</p>

        <p>
          <strong>Rating:</strong> ${selectedItem.averageRating}
          (${selectedItem.numberOfReviews} reviews)
        </p>

        <p>
          <strong>Categories:</strong>
          ${selectedItem.categories.join(", ")}
        </p>

        <p>
          <strong>Address:</strong>
          ${selectedItem.location.address} ${selectedItem.location.city}
          ${selectedItem.location.country}
        </p>

        <p>
          <strong> Telephone:</strong>
          ${selectedItem.contactInfo.phone}
        </p>
      </article>
    </article>
  `;
}
