describe('Deck Management Tests', () => {
  // Define a variable to store the deck ID
  let deckId;
  const url = Cypress.config('baseUrl')

  before(() => {
    // Create a new deck before running the tests
    cy.visit("https://www.deckofcardsapi.com")
    cy.request('GET', `${url}/new`).then((response) => {
      cy.validateBasicResponse({response: response, status: 200, success: true, remaining: 52});
      expect(response.body).to.have.property('shuffled', false); // Ensure the new deck is not yet shuffled
      deckId = response.body.deck_id; // Assign the deck_id to the variable
    });
  });

  it('Add Jokers to the Deck and shuffle', () => {
    // Add 2 jokers to the deck via shuffle
    cy.request('GET', `${url}/${deckId}/shuffle?jokers_enabled=true`).then((response) => {
      cy.validateBasicResponse({response: response, status: 200, success: true, remaining: 54});
      expect(response.body).to.have.property('shuffled', true); // Ensure the new deck is now shuffled
      expect(response.body).to.have.property('deck_id', deckId); // Ensure the response contains the correct deck_id
    });
  });
});
