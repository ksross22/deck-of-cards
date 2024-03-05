Cypress.Commands.add('validateBasicResponse', ({response, status, success, remaining}) => {
    expect(response.status).to.equal(status); // Ensure the response status
    expect(response.body).to.have.property('success', success); // Assert Success property
    expect(response.body).to.have.property('deck_id'); // Ensure the response contains a deck_id
    expect(response.body).to.have.property('remaining', remaining); // Expect correct number of cards
});