/// <reference types="cypress" />

describe("journey genius happy flow spec", () => {
  beforeEach(() => {
    cy.intercept("GET", "/journeyData?*", {
      statusCode: 404,
      body: {},
    }).as("getJourneyData");

    cy.visit("/");
  });

  it("should display a message when there is an error while fetching journey data", () => {
    cy.get("journey-searchbar", { includeShadowDom: true }).type("Cafe");
    cy.get("journey-button-submit", { includeShadowDom: true }).click();

    cy.wait("@getJourneyData").then((interception) => {
      expect(interception.response?.statusCode).to.equal(404);
    });

    cy.get("journey-error", { includeShadowDom: true })
      .should("be.visible")
      .find("p[data-test='journey-error-message']", { includeShadowDom: true })
      .should(
        "contain.text",
        "There was an error while fetching data. Please try again."
      );
  });

  it("should display a message when there are no results found", () => {
    cy.intercept("GET", "/journeyData?*", {
      statusCode: 200,
      body: [],
    }).as("getJourneyData");

    cy.get("journey-searchbar", { includeShadowDom: true }).type(
      "NonExistentPlace"
    );
    cy.get("journey-button-submit", { includeShadowDom: true }).click();

    cy.wait("@getJourneyData").then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
    });

    cy.get("p[data-test='journey-no-results-found']", {
      includeShadowDom: true,
    }).should("contain.text", "No results found for your search.");
  });
});
