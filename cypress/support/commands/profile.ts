export const updateProfile = (firstName: string, lastName: string) => {
    cy.getByTestId('EditableProfileCardHeader.EditButton').click();
    cy.get('[data-testid="ProfileCard.firstname"]').clear().type('new');
    cy.get('[data-testid="ProfileCard.lastname"]').clear().type('lastname');
    cy.get('[data-testid="EditableProfileCardHeader.SaveButton"]').click();
};

export const resetProfile = (profileId: string) => {
    return cy.request({
        method: 'PUT',
        url: `http://localhost:8000/profile/${profileId}`,
        headers: { Authorization: 'asasf' },
        body: {
            id: '4',
            first: 'test',
            lastname: 'user',
            age: 465,
            currency: 'EUR',
            country: 'Ukraine',
            city: 'Moscow',
            username: 'testuser',
            avatar: 'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
        },
    });
};

// декларации для команд - типизация
declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstName: string, lastName: string): Chainable<void>
            resetProfile(profileId: string): Chainable<void>
        }
    }
}
