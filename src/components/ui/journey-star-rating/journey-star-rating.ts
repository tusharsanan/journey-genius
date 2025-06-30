import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("journey-star-rating")
export class StarRating extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 5;

  static styles = css`
    .star {
      font-size: 1.5rem;
      color: var(--primary-color);
      cursor: pointer;
      user-select: none;
      transition: color 0.2s;
    }
    .star.inactive {
      color: var(--gray-100);
    }
    .star:focus {
      outline: 2px solid #0077cc;
    }
  `;

  private setRating(rating: number) {
    if (this.value === rating) {
      this.value = 0;
    } else {
      this.value = rating;
    }

    this.dispatchEvent(
      new CustomEvent("rating-changed", {
        detail: { value: rating },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div role="radiogroup" aria-label="Star rating">
        ${Array.from(
          { length: this.max },
          (_, i) => html`
            <span
              class="star ${i < this.value ? "" : "inactive"}"
              role="radio"
              aria-checked="${this.value === i + 1}"
              tabindex="0"
              @click=${() => this.setRating(i + 1)}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") this.setRating(i + 1);
              }}
              >&#9733;</span
            >
          `
        )}
      </div>
    `;
  }
}
