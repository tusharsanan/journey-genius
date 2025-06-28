import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { JourneyItem } from "../../types/journey-item-types";
import { repeat } from "lit/directives/repeat.js";
import "../ui/journey-card/journey-card";
import "../ui/journey-dialog/journey-dialog";
import "../journey-review/journey-review";
import "../ui/journey-button/journey-button";
import { reviewDialogBodyTemplate } from "../../templates/review-dialog-body-template";

@customElement("journey-section-list")
export class JourneySectionList extends LitElement {
  @property({ type: Array }) items: JourneyItem[] = [];
  @query(".close-button") closeButton!: HTMLElement;

  static styles = css`
    journey-card {
      display: flex;
      height: 100%;
      cursor: pointer;

      @media (min-width: 600px) {
        display: flex;
        box-sizing: border-box;
      }
    }

    .close-button {
      background: none;
      color: var(--primary-color);
      font-size: 1.5rem;
      justify-content: flex-end;
      display: flex;
    }

    .dialog {
      padding: var(--space-4);
      pointer-events: auto;
    }

    .journey-section-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      grid-gap: var(--space-3);
    }

    .top-reviews {
      margin-top: var(--space-4);
    }

    .card-image {
      max-width: 100%;
      max-height: 300px;
      width: auto;
      height: auto;
      display: block;
      border-radius: 8px;
      object-fit: cover;
    }

    .header {
      padding: var(--space-3);
    }

    .description {
      padding: 0 var(--space-3) var(--space-3);
    }

    h2 {
      margin-top: var(--space-4);
      font-size: 1.75rem;
      margin-bottom: var(--space-3);

      @media (min-width: 1025px) {
        margin-top: 0;
      }
    }

    .item-container {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;

      @media (min-width: 1025px) {
        flex-direction: row;
      }
    }

    .item-details {
      display: flex;
      flex-direction: column;
      flex: 1;

      @media (min-width: 1025px) {
        margin-left: var(--space-6);
      }
    }

    .item-details p {
      margin-top: 0;
      margin-bottom: var(--space-3);
    }
  `;

  @state() private _isOpen = false;
  @state() private _selectedItem: JourneyItem | null = null;

  openDialog(item: JourneyItem) {
    this._selectedItem = item;
    this._isOpen = true;
  }

  handleDialog(e: any) {
    this._isOpen = e.detail.opened;
  }

  closeDialog() {
    this._isOpen = false;
  }

  onKeydown(e: KeyboardEvent, item: JourneyItem) {
    if (e.key === "Enter" || e.key === " ") {
      this.openDialog(item!);
    }
  }

  render() {
    return html`
      <div class="journey-section-list">
        ${repeat(
          this.items,
          (item) => item.id,
          (item) => html` <journey-card
            @click=${() => this.openDialog(item)}
            @keypress=${(event: KeyboardEvent) => this.onKeydown(event, item)}
            role="button"
            tabindex="0"
          >
            <img
              slot="image"
              class="card-image"
              src="${item.image}"
              alt="${item.title}"
            />
            <h2 slot="header" class="header">${item.title}</h2>

            <div class="description">
              <p>${item.description}</p>
              <p>
                Rating: ${item.averageRating} (${item.numberOfReviews} reviews)
              </p>
              <p>Features: ${item.contactInfo.features}</p>
            </div>
          </journey-card>`
        )}
      </div>

      <journey-dialog
        .config="${{ hidesOnOutsideEsc: true }}"
        ?opened=${this._isOpen}
        @opened-changed=${this.handleDialog}
      >
        <div slot="content" class="dialog">
          ${this._selectedItem && this._isOpen
            ? html`
                <div class="close-button">
                  <journey-button @click=${this.closeDialog}>X</journey-button>
                </div>

                ${reviewDialogBodyTemplate(this._selectedItem)}

                <journey-review
                  .itemId="${this._selectedItem.id}"
                  .averageRating="${this._selectedItem.numberOfReviews}"
                  @review-submitted="${this.closeDialog}"
                ></journey-review>

                <section class="top-reviews">
                  <h3>Top reviews</h3>

                  ${this._selectedItem.reviews.length > 0
                    ? html`<ul>
                        ${repeat(
                          this._selectedItem.reviews,
                          (review) => review.id,
                          (review) => html`<li>${review.comment}</li>`
                        )}
                      </ul>`
                    : html`<p>No reviews yet.</p>`}
                </section>
              `
            : html`<div slot="content">${nothing}</div>`}
        </div>
      </journey-dialog>
    `;
  }
}
