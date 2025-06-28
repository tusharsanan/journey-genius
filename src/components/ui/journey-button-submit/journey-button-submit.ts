import { customElement } from "lit/decorators.js";
import { LionButtonSubmit } from "@lion/ui/button.js";
import { css } from "lit";

@customElement("journey-button-submit")
export class JourneyButtonSubmit extends LionButtonSubmit {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          background-color: var(--primary-color);
          border-radius: 8px;
          color: #fff;
          border: 2px solid #fff;
          padding: 6px 24px;
          text-align: center;
          font-size: 18px;
          cursor: pointer;
          border-radius: 25px;
          font-weight: 700;
        }

        :host(:hover),
        :host(:focus) {
          background-color: var(--primary-color-dark);
          color: #fff;
          cursor: pointer;
        }
      `,
    ];
  }
}
