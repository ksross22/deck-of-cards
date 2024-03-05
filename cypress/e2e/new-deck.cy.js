
describe('New Deck Tests', () => {
    const url = Cypress.config('baseUrl')
  
    it('Create a new Deck', () => {
        // Create a new deck 
        cy.request('GET', `${url}/new`).then((response) => {
            cy.validateBasicResponse({response: response, status: 200, success: true, remaining: 52});
            expect(response.body).to.have.property('shuffled', false); // Ensure the new deck is not yet shuffled
        });
    });

    it('Create a new Deck with Jokers', () => {
        // Create a new deck with Jokers
        cy.request('GET', `${url}/new?jokers_enabled=true`).then((response) => {
            cy.validateBasicResponse({response: response, status: 200, success: true, remaining: 54});
            expect(response.body).to.have.property('shuffled', false); // Ensure the new deck is not yet shuffled
        });
    });

    it('Create Multiple Decks', () => {
        cy.request('GET', `${url}/new/shuffle/?deck_count=3`).then((response) => {
            cy.validateBasicResponse({response: response, status: 200, success: true, remaining: 156});
            expect(response.body).to.have.property('shuffled', true); // Ensure the new deck is shuffled
        });
    });
    
    it('Create Multiple Decks with Jokers', () => {
        // Add 2 jokers to the deck per deck with shuffle
        cy.request('GET', `${url}/new/shuffle/?deck_count=3&jokers_enabled=true`).then((response) => {
            cy.validateBasicResponse({response: response, status: 200, success: true, remaining: 162});
            expect(response.body).to.have.property('shuffled', true); // Ensure the new deck is shuffled
        });
    });

    it('Validates card image URLs from Deck of Cards API', () => {
        cy.request('GET', `${url}/new/draw/?count=1`).then((response) => {
            expect(response.status).to.equal(200); // Ensure the API request is successful
    
            // Check if the response contains card data
            expect(response.body).to.have.property('cards').to.be.an('array').to.have.lengthOf.at.least(1);
    
            // Loop through each card in the response
            response.body.cards.forEach((card) => {
                expect(card).to.have.property('image'); // Ensure each card has an 'image' property
    
                // Simulate image loading and check status code
                cy.request(card.image).then((imageResponse) => {
                    expect(imageResponse.status).to.equal(200); // Ensure the image URL returns a 200 status code
                });
            });
        });
    });
});