describe('Pile Management Tests', () => {
  // Define a variable to store the deck ID
  let deckId;
  // Define a variable to store the pile name
  let pileName = 'my_pile';
  let drawnCards;
  const url = Cypress.config('baseUrl')

  before(() => {
    // Create a new deck before running the tests
    cy.request('GET', `${url}/new/`).then((response) => {
      cy.validateBasicResponse({response: response, status: 200, success: true, remaining: 52});
      expect(response.body).to.have.property('shuffled', false);
      deckId = response.body.deck_id; // Assign the deck_id to the variable
    });
  });

  it('Draw one card', () => {
    // Include specific cards in a pile
    cy.request('GET', `${url}/${deckId}/draw/?count=1`).then((response) => {
      cy.validateBasicResponse({response: response, status: 200, success: true, remaining: 51});
      expect(response.body).to.have.property('cards').with.lengthOf(1);
    });
  });

  it('Draw another two cards and add to my pile', () => {
    // Include specific cards in a pile
    cy.request('GET', `${url}/${deckId}/draw/?count=2`).then((response) => {
      cy.validateBasicResponse({response: response, status: 200, success: true, remaining: 49});
      expect(response.body).to.have.property('cards').with.lengthOf(2);
      drawnCards = response.body.cards
      cy.request('GET', `${url}/${deckId}/pile/${pileName}/add/?cards=${drawnCards[0].code},${drawnCards[1].code}`).then((response) => {
        cy.log(response)
        expect(response.body.piles[pileName]).to.have.property('remaining', 2);
        
      });
    });
  });

  it('Validate and List the cards in my pile', () => {
    // list cards in my pile
    cy.request('GET', `${url}/${deckId}/pile/${pileName}/list`).then((response) => {
      cy.validateBasicResponse({response: response, status: 200, success: true, remaining: 49});
      expect(response.body.piles[pileName]).to.have.property('remaining', 2);
      expect(response.body.piles[pileName]).to.have.property('cards').with.lengthOf(2);
      expect(response.body.piles[pileName].cards[0].code).to.equal(drawnCards[0].code);
      expect(response.body.piles[pileName].cards[1].code).to.equal(drawnCards[1].code);
    });
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

  // Noticed that this also doesn't appear to be working at least how i initially assumed. The cards don't appear
  // to be moving into the piles property without drawing the cards first (which in play makes sense but isn't specified in documentation)
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

  it('Shuffle Specific Pile', () => {
    // Shuffle a specific pile of cards
    cy.request('GET', `${url}/${deckId}/pile/${pileName}/shuffle/`).then((response) => {
      cy.validateBasicResponse({response: response, status: 200, success: true, remaining: 49});
      expect(response.body).to.have.property('deck_id', deckId); // Ensure the response contains a deck_id
      expect(response.body).to.have.property('piles'); // ensure piles property
      expect(response.body.piles).to.have.property(pileName); // ensure pile name
      // TODO: Expand on this test
      // I would like to do more to ensure the order of the cards are different but in my case above 
      // I only have 2 cards in the pile and would need to expand on this likely by drawing more/adding more 
      // to my piles and creating a method to validate via iteration instead of singular expect statements
    });
  });  
});

  

