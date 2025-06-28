import { customElement } from "lit/decorators.js";
import { LionSelect } from "@lion/ui/select.js";
import { css } from "lit";

@customElement("journey-select")
export class JourneySelect extends LionSelect {
  static get styles() {
    return [
      ...super.styles,
      css`
        ::slotted([slot="input"]) {
          padding: var(--space-4) 0 var(--space-4) var(--space-2);
          border: 1px solid #e0e0e0;

          @media screen and (min-width: 600px) {
            border-radius: 8px 0px 0px 8px;
          }
        }
      `,
    ];
  }
}
