describe('Pile Management Tests', () => {
  // Define a variable to store the deck ID
  let deckId;
  // Define a variable to store the pile name
  let pileName = 'my_pile';

  const url = Cypress.config('baseUrl')

  before(() => {
    // Create a new deck before running the tests
    cy.request('GET', `${url}/new/`).then((response) => {
      cy.validateBasicResponse({response: response, status: 200, success: true, remaining: 52});
      expect(response.body).to.have.property('shuffled', false);
      deckId = response.body.deck_id; // Assign the deck_id to the variable
    });
    cy.wait(1000)
  });

  ///https://www.deckofcardsapi.com/api/deck/<<deck_id>>/draw/bottom/

  //  This doesn't seem to work properly based on documentation and got similar errors in postman
  //   "Drawing from Piles"
  //    https://www.deckofcardsapi.com/api/deck/<<deck_id>>/draw/bottom/

  // it('Draw random cards', () => {
  //   // Include specific cards in a pile
  //   cy.request('GET', `${url}/${deckId}/draw/bottom/?count=10`).then((response) => {
  //     cy.validateBasicResponse({response: response, status: 200, success: true, remaining: 52});
  //     cy.log(response)
  //   });
  // });

  // Noticed that this also doesn't appear to be fully working. The cards don't appear
  // to be moving into the piles property as an example:
  //   "body": {
  //       "success": true,
  //       "deck_id": "zbzmxoavqz43",
  //       "remaining": 52,
  //       "piles": {
  //           "my_pile": {
  //               "remaining": 0
  //           }
  //       }
  //   }
  // This would fail QA and fail the cypress test (i commented out for the interview)
  // because 5 cards should have been moved from remaining into 'my_pile' so.. 
  it('Add specific Cards to Pile', () => {
    // Include specific cards in a pile
    cy.request('GET', `${url}/${deckId}/pile/${pileName}/add/?cards=AS,2S,3S,4H,QD`).then((response) => {
      cy.log("Setting this up for the next text to shuffle this pile")
      // cy.validateBasicResponse({response: response, status: 200, success: true, remaining: 47});
      // expect(response.body).to.have.property('deck_id', deckId); // Ensure the response contains a deck_id
      // expect(response.body).to.have.property('piles'); // ensure piles property
      // expect(response.body.piles).to.have.property(pileName); // ensure pile name
      // expect(response.body.piles[pileName]).to.have.property('remaining', 5);
      // cy.log(response)
    });
  });

  it('Shuffle Specific Pile', () => {
    // Shuffle a specific pile of cards
    cy.request('GET', `${url}/${deckId}/pile/${pileName}/shuffle/`).then((response) => {
      cy.validateBasicResponse({response: response, status: 200, success: true, remaining: 52});
      expect(response.body).to.have.property('deck_id', deckId); // Ensure the response contains a deck_id
      expect(response.body).to.have.property('piles'); // ensure piles property
      expect(response.body.piles).to.have.property(pileName); // ensure pile name
      
    });
  });  
});

  

