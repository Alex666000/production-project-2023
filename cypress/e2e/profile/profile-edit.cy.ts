let profileId = '';

describe('Пользователь заходит на страницу профиля', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit(`profile/${data.id}`);
        });
    });

    afterEach(() => {
        // после первого теста данные в профиле изменены и после каждого теста сбрасываем
        // данные
        cy.resetProfile(profileId);
    });

    it('И профиль успешно загружается', () => {
        // cy.get(selectByTestId('ProfilePage.firstname')).should('have.value', 'test');
        cy.getByTestId('ProfileCard.firstname').should('have.value', 'test');
    });

    it('И редактирует его', () => {
        const newName = 'new';
        const newLastName = 'lastname';
        cy.updateProfile(newName, newLastName);
        cy.get('[data-testid="ProfileCard.firstname"]').should('have.value', newName);
        cy.get('[data-testid="ProfileCard.lastname"]').should('have.value', newLastName);
    });
});
