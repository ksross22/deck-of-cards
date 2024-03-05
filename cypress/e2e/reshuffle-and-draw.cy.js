describe('Reshuffle and Draw Tests', () => {
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

  it('Reshuffle the Deck', () => {
    // Shuffle the deck
    cy.request('GET', `${url}/${deckId}/shuffle`).then((response) => {
      cy.validateBasicResponse({response: response, status: 200, success: true, remaining: 52});
      expect(response.body).to.have.property('shuffled', true); // Ensure the new deck is now shuffled
      expect(response.body).to.have.property('deck_id', deckId); // Ensure the response contains the correct deck_id
    });
  });

  it('Draw Specific Number of Cards', () => {
    // Draw 5 cards from the deck
    cy.request('GET', `${url}/${deckId}/draw/?count=5`).then((response) => {
      // update remaining to only have 47
      cy.validateBasicResponse({response: response, status: 200, success: true, remaining: 47});
      expect(response.body).to.have.property('cards').with.lengthOf(5); // Ensure that I drew 5 cards
      expect(response.body).to.have.property('deck_id', deckId); // Ensure the response contains the correct deck_id
    });
  });

  it('Invalid Deck ID', () => {
    // Attempt to draw cards using an invalid deck ID
    cy.request({method: 'GET', url: `${url}/invalid_deck_id/draw/?count=5`, failOnStatusCode: false}).then((response) => {
      expect(response.status).to.equal(404); // Ensure the request is invalid
      expect(response.body).to.have.property('error', 'Deck ID does not exist.') 
    })
  });

  it('Draw More Cards Than Available', () => {
    // Attempt to draw more cards than are available in the deck
    cy.request({method: 'GET', url: `${url}/${deckId}/draw/?count=100`, failOnStatusCode: false}).then((response) => {
      expect(response.body).to.have.property('success', false) 
      expect(response.body).to.have.property('error', 'Not enough cards remaining to draw 100 additional') 
      expect(response.body).to.have.property('remaining', 0);
      expect(response.body).to.have.property('cards').with.lengthOf(47); // Should have all the previously remaining cards
    });
  });
});
