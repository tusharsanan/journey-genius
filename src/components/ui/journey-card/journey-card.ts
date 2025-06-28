import { css, html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("journey-card")
export class JourneyCard extends LitElement {
  static styles = css`
    :host {
      max-width: var(--card-width, auto);
      max-height: var(--card-height, auto);
    }

    .journey-card {
      border-radius: 8px;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    }
  `;

  public render(): TemplateResult {
    return html` <div class="journey-card">
      <slot name="image"></slot>
      <slot name="header"></slot>
      <slot></slot>
    </div>`;
  }
}
