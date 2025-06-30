import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { notificationStyles } from "../../styles/notification.styles";

@customElement("journey-error")
export class JourneyError extends LitElement {
  static styles = [notificationStyles];

  public render(): TemplateResult {
    return html`<p
      data-test="journey-error-message"
      class="journey-notification journey-error-notification"
    >
      <slot></slot>
    </p>`;
  }
}
