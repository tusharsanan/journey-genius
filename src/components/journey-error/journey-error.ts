import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("journey-error")
export class JourneyError extends LitElement {
  public render(): TemplateResult {
    return html`<p data-test="journey-error-message">
      There was an error while fetching data. Please try again.
    </p>`;
  }
}
