import { css, html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("journey-header")
export class JourneyHeader extends LitElement {
  static styles = css`
    header {
      background-color: var(--primary-color);
      color: #fff;
      text-align: center;
      font-weight: bold;
      padding: var(--space-4);
    }

    .heading {
      margin: 0;
      font-size: var(--font-size-lg);
    }
  `;

  public render(): TemplateResult {
    return html`<header>
      <span class="heading">Journey genius</span>
    </header>`;
  }
}
