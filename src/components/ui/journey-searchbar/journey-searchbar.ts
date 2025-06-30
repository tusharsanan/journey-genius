import { css } from "lit";
import { LionInput } from "@lion/ui/input.js";
import { customElement, property } from "lit/decorators.js";

@customElement("journey-searchbar")
export class JourneySearchbar extends LionInput {
  static get styles() {
    return [
      ...super.styles,
      css`
        ::slotted(input) {
          border: 1px solid #e0e0e0;
          outline: none;
          padding: var(--space-4);
          background: #fff;
          box-shadow: 0 2px 16px var(--gray-300);
          transition: box-shadow 0.2s;
          line-height: 1.25rem;

          @media screen and (min-width: 600px) {
            border-radius: 0 8px 8px 0;
          }
        }

        ::slotted(input:focus) {
          box-shadow: 0 0 0 3px var(--primary-color, #2196f3);
        }

        ::slotted(input)::placeholder {
          color: var(--gray-300);
          font-style: italic;
        }

        .form-field__feedback {
          padding: var(--space-2);
        }
      `,
    ];
  }

  @property({ type: String }) placeholderText: string = "Search for a title...";

  constructor() {
    super();
    this.type = "search";
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("placeholder", this.placeholderText);
  }
}
