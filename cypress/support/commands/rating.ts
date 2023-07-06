export const setRate = (starsCount = 5, feedback = 'feedback') => {
    // нажали на нужную нам звезду
    cy.getByTestId(`StarRating.${starsCount}`).click();
    // ввели в инпут
    cy.getByTestId('RatingCard.Input').type(feedback);
    // нажали
    cy.getByTestId('RatingCard.Send').click();
};

declare global {
    namespace Cypress {
        interface Chainable {
            setRate(starsCount: number, feedback: string): Chainable<void>;
        }
    }
}
