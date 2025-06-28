import { css, html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

import "./components/journey-error/journey-error";
import "./components/journey-home/journey-home";

@customElement("journey-genius-app")
export class JourneyGeniusApp extends LitElement {
  static styles = css`
  :host {
    display: flex;
    flex-direction: column;
    `;

  public render(): TemplateResult {
    return html` <journey-home></journey-home> `;
  }
}
