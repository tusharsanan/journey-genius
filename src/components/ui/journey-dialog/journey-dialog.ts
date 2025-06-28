import { LionDialog } from "@lion/ui/dialog.js";
import { css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("journey-dialog")
export class JourneyDialog extends LionDialog {
  static get styles() {
    return css`
      ::slotted([slot="content"]) {
        background-color: #fff;
        width: 70vw;
        height: 70vh;
        max-width: 70vw;
        max-height: 70vh;
        overflow-y: scroll;
        border-radius: 8px;
      }
    `;
  }
}
