# Cypress Test Suite

This repository contains a test suite built with Cypress for testing Deck of Cards (an API): https://www.deckofcardsapi.com/
.

## Installation

1. Clone this repository to your local machine:
`git clone https://github.com/ksross22/deck-of-cards.git`

2. Navigate to the project directory:
`cd deck-of-cards`

3. Install dependencies:
`npm install`

4. Run Tests
`npm run cypress:open`

This will open the Cypress Test Runner, where you can select and run individual test files or the entire suite.

By default, tests will run in the Electron browser. To specify a different browser, use the `--browser` flag:

`npm run cypress:open --browser chrome`

For more options and configurations, refer to the Cypress documentation: [Cypress Configuration](https://docs.cypress.io/guides/references/configuration.html)


## Additional Details and Testing Notes

**Scenarios Covered:**
- Brand New Deck of Cards
- Shuffled Deck of Cards
- Reshuffled Deck of Cards
- Partial Deck of Cards
- Adding to "my" Pile
- Shuffling Piles
- Listing the cards in my pile
- Drawing from my pile
- Returning card I drew back to the deck
- Card Images 
    - Cards drawn have images
    - Back of Card images API success

**Scenarios that ran into issues:**
- Draw from Bottom/Top of deck
- Draw random cards from deck
- Return cards to pile that were previously drawn



I wanted to make notes of additional test cases I was thinking about covering, however, with the limited time, I did not implement in cypress. However, with more time, these were some additional cases I would have like to have seen covered.

**Shuffle Piles:**
- Assert that the order of cards in the pile has changed after shuffling.
- Verify that all cards are still present in the pile after shuffling.

**Verify Shuffle Piles doesn’t work with multiple decks:**
- Confirm that an appropriate error message is returned when attempting to shuffle piles with multiple decks.
- Ensure that the pile remains unchanged if shuffling with multiple decks is attempted.

**List cards in pile (partial):**
- Verify that the order of cards in the list matches the order in the pile.

**Verify List cards in piles doesn’t work with multiple decks:**
- Confirm that an appropriate error message is returned when attempting to list cards in piles with multiple decks.
- Ensure that the list of cards remains unchanged if listing with multiple decks is attempted.

**Draw from piles - Bottom/Random with/without count param:**
- Note that I did attempt to test this scenario but it failed and is commented out
    - Assert that the drawn cards are removed from the pile.
    - Verify that the number of remaining cards in the pile has decreased by the appropriate amount.
    - Check that the drawn cards match the expected cards.

**Return cards to deck:**
- Check that the returned cards are present in the deck after returning.

**Test to cover validation of card image:**
- Validate URL pattern with code/file name

**Partial deck scenario:**
- Verify that the drawn cards are not present in the remaining cards after drawing.
- Confirm that shuffling the deck results in a different order of cards.
