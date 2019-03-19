describe("Alakajam!", () => {
  it("has a home page", () => {
    cy.visit("/");
    cy.contains("Welcome to Alakajam!");
  });
});
