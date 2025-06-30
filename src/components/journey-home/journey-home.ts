import { css, html, LitElement, nothing, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

import { Task } from "@lit/task";
import { MinLength, Required } from "@lion/ui/form-core.js";
import { loadDefaultFeedbackMessages } from "@lion/ui/validate-messages.js";

import "../journey-error/journey-error";
import "../journey-header/journey-header";
import "../journey-section-list/journey-section-list";
import "../journey-section-list/journey-section-list";
import "../ui/journey-button-submit/journey-button-submit";
import "../ui/journey-form/journey-form";
import "../ui/journey-searchbar/journey-searchbar";
import "../ui/journey-select/journey-select";
import "../ui/journey-select/journey-select";

import { JourneyItem } from "../../types/journey-item-types";
import { fetchItemsData } from "../../services/items.service";
import { repeat } from "lit/directives/repeat.js";
import { JourneyItemType } from "../../constants/journey.constants";
import { notificationStyles } from "../../styles/notification.styles";

@customElement("journey-home")
export class JourneyHome extends LitElement {
  @state() itemType = "";
  @state() itemValue = "";
  @state() isFormSubmitted = false;
  @state() searchType: string[] = [
    JourneyItemType.RESTAURANT,
    JourneyItemType.HOTEL,
  ];

  constructor() {
    super();
    loadDefaultFeedbackMessages();
  }

  static styles = [
    notificationStyles,
    css`
      main {
        margin: var(--space-9) 0;
      }

      h1 {
        margin: 0;
        font-size: var(--font-size-xl);
        text-align: center;
        margin-bottom: var(--space-6);
      }

      .container {
        max-width: 1180px;
        padding-right: var(--space-4);
        padding-left: var(--space-4);
        margin-right: auto;
        margin-left: auto;
      }

      .search-form {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin-bottom: var(--space-6);

        @media screen and (min-width: 600px) {
          flex-direction: row;
          align-items: baseline;
        }
      }

      .search-input {
        flex: 1;
        margin-top: var(--space-4);

        @media screen and (min-width: 600px) {
          margin-top: 0;
        }
      }

      .journey-section-list {
        justify-content: center;
        width: 100%;
      }

      .search-input[shows-feedback-for~="error"] {
        background-color: #ffd4d4;
        border: 1px solid red;
      }

      .search-button {
        justify-content: center;
        margin-top: var(--space-4);

        @media screen and (min-width: 600px) {
          margin-left: var(--space-4);
          margin-top: 0;
        }
      }
    `,
  ];

  #fetchItemsTask = new Task(this, {
    task: ([itemValue, itemType]: [string, string]) =>
      fetchItemsData(itemValue, itemType),
    autoRun: false,
  });

  submitHandler(ev: any): void {
    const formData = ev.target.serializedValue;

    if (!ev.target.hasFeedbackFor?.includes("error")) {
      this.itemType = formData.itemType;
      this.itemValue = formData.search;
      this.isFormSubmitted = true;
      this.#fetchItemsTask.run([this.itemValue, this.itemType]);
    }
  }

  public render(): TemplateResult {
    return html`
      <journey-header></journey-header>

      <main>
        <section class="container">
          <h1>Where are you going?</h1>

          <journey-form @submit="${this.submitHandler}">
            <form class="search-form">
              <journey-select name="itemType">
                <select slot="input">
                  <option selected value="">All</option>
                  ${repeat(
                    this.searchType,
                    (searchType) => searchType,
                    (searchType) =>
                      html`<option value="${searchType.toLowerCase()}">
                        ${searchType}
                      </option>`
                  )}
                </select>
              </journey-select>

              <journey-searchbar
                class="search-input"
                .validators="${[new Required(), new MinLength(3)]}"
                name="search"
              >
              </journey-searchbar>

              <journey-button-submit class="search-button"
                >Search</journey-button-submit
              >
            </form>
          </journey-form>

          ${this.isFormSubmitted
            ? html`${this.#fetchItemsTask.render({
                pending: () => html`<p>Loading items...</p>`,
                complete: (itemsData: JourneyItem[]) =>
                  itemsData.length
                    ? html` <h2>Search results:</h2>
                        <journey-section-list
                          .items=${itemsData}
                        ></journey-section-list>`
                    : html`<p
                        data-test="journey-no-results-found"
                        class="journey-notification journey-warning-notification"
                      >
                        No results found for your search. Try adjusting your
                        search criteria or explore other categories.
                      </p>`,
                error: () =>
                  html`<journey-error
                    >There was an error while fetching data. Please try
                    again.</journey-error
                  >`,
              })}`
            : nothing}
        </section>
      </main>
    `;
  }
}
