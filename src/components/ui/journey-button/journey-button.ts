import { customElement } from "lit/decorators.js";
import { LionButton } from "@lion/ui/button.js";
import { css } from "lit";

@customElement("journey-button")
export class JourneyButton extends LionButton {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host,
        :host(:active) {
          background: none;
        }
      `,
    ];
  }
}
