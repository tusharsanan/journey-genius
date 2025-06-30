import { html, TemplateResult } from "lit";

export function reviewNotificationsTemplate(
  success: boolean = true
): TemplateResult {
  if (success) {
    return html`<p
      data-test="thank-you-message"
      class="journey-notification journey-success-notification"
    >
      Thank you for your review! Your review has been saved.
    </p>`;
  } else {
    return html`<p
      data-test="error-message"
      class="journey-notification journey-error-notification"
    >
      Sorry, there was a problem saving your review. Please close the popup and
      try again.
    </p>`;
  }
}
