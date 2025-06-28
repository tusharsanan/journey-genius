/// <reference types="cypress" />

describe("journey genius happy flow spec", () => {
  beforeEach(() => {
    cy.intercept("GET", "/journeyData?*", {
      fixture: "journeyData.json",
    }).as("getJourneyData");

    cy.intercept("PATCH", "http://localhost:3000/journeyData/*", {
      fixture: "patchedJourneyData.json",
    }).as("patchedJourneyData");

    cy.visit("/");
  });

  it("can search for an item and see results", () => {
    cy.get("journey-searchbar", { includeShadowDom: true }).type("Cafe");
    cy.get("journey-button-submit", { includeShadowDom: true }).click();

    cy.wait("@getJourneyData").then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
    });

    cy.get("journey-card", { includeShadowDom: true })
      .should("have.length", 3)
      .first()
      .should("contain.text", "Cafe Bliss");
  });

  it("can open a popup and view details", () => {
    cy.get("journey-searchbar", { includeShadowDom: true }).type("Cafe");
    cy.get("journey-button-submit", { includeShadowDom: true }).click();
    cy.wait("@getJourneyData");

    cy.get("journey-card", { includeShadowDom: true })
      .first()
      .should("contain.text", "Cafe Bliss")
      .click();

    cy.get("journey-dialog", { includeShadowDom: true })
      .should("be.visible")
      .find("h2")
      .should("contain.text", "Cafe Bliss");
  });

  it("can submit a review and see thank you message", () => {
    cy.get("journey-searchbar", { includeShadowDom: true }).type("Cafe");
    cy.get("journey-button-submit", { includeShadowDom: true }).click();
    cy.wait("@getJourneyData");

    cy.get("journey-card", { includeShadowDom: true }).first().click();

    cy.get("journey-dialog", { includeShadowDom: true })
      .find("journey-star-rating", { includeShadowDom: true })
      .scrollIntoView()
      .should("be.visible")
      .find(".star", { includeShadowDom: true })
      .first()
      .click();

    cy.get("journey-dialog", { includeShadowDom: true })
      .find("journey-textarea", { includeShadowDom: true })
      .type("Great place with amazing coffee!");

    cy.get("journey-dialog", { includeShadowDom: true })
      .find("journey-button-submit", { includeShadowDom: true })
      .click();

    cy.wait("@patchedJourneyData").then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
    });

    cy.get("journey-dialog", { includeShadowDom: true })
      .find("journey-textarea", { includeShadowDom: true })
      .should("not.exist");

    cy.get("journey-dialog", { includeShadowDom: true })
      .find("p[data-test='thank-you-message']", { includeShadowDom: true })
      .should(
        "contain.text",
        "Thank you for your review! Refresh the page to see your review here"
      );
  });

  it("shows top reviews after submitting a review", () => {
    cy.get("journey-searchbar", { includeShadowDom: true }).type("Cafe");
    cy.get("journey-button-submit", { includeShadowDom: true }).click();
    cy.wait("@getJourneyData");

    cy.get("journey-card", { includeShadowDom: true }).first().click();

    cy.get("journey-dialog", { includeShadowDom: true })
      .find("journey-star-rating", { includeShadowDom: true })
      .find(".star", { includeShadowDom: true })
      .first()
      .click();

    cy.get("journey-dialog", { includeShadowDom: true })
      .find("journey-textarea", { includeShadowDom: true })
      .type("Great place with amazing coffee!");

    cy.get("journey-dialog", { includeShadowDom: true })
      .find("journey-button-submit", { includeShadowDom: true })
      .click();

    cy.wait("@patchedJourneyData");

    cy.get("journey-dialog", { includeShadowDom: true })
      .find("section.top-reviews", { includeShadowDom: true })
      .should("be.visible")
      .find("ul li")
      .should("contain.text", "Amazing food and great service!");
  });

  it("should close the dialog when clicking the close button", () => {
    cy.get("journey-searchbar", { includeShadowDom: true }).type("Cafe");
    cy.get("journey-button-submit", { includeShadowDom: true }).click();
    cy.wait("@getJourneyData");

    cy.get("journey-card", { includeShadowDom: true }).first().click();

    cy.get("journey-dialog", { includeShadowDom: true })
      .should("be.visible")
      .find(".close-button journey-button", { includeShadowDom: true })
      .click();

    cy.get("journey-dialog", { includeShadowDom: true }).should(
      "not.be.visible"
    );
  });
});
