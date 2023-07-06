let profileId = '';

describe('Пользователь заходит на страницу профиля', () => {
    // перед каждым тестом отработает beforeEach - чтобы не было мутаций данных их
    // возвращаем в исходное состояние
    beforeEach(() => {
        // открываем страницу
        cy.visit('');
        // открываем станицу того user-a под которым мы залогинелись
        cy.login().then((data) => {
            // после того как залогинелись id профиля в переменную на стр 1 - сохраняем
            profileId = data.id;
            // переходим на страницу пользователя под котрым сделали логин
            cy.visit(`profile/${data.id}`);
            // теперь профиль в браузере cypress подгрузится и можно писать тесты...
        });
    });

    // После каждого теста данные сбрасывать нужно
    afterEach(() => {
        // после первого теста данные в профиле изменены и после каждого теста сбрасываем
        // данные
        cy.resetProfile(profileId);
    });

    // ТЕСТЫ
    it('И профиль успешно загружается', () => {
        // cy.get(selectByTestId('ProfilePage.firstname')).should('have.value', 'test');
        // have.value - какое value содержится внутри Input
        cy.getByTestId('ProfileCard.firstname').should('have.value', 'test');
    });

    it('И редактирует его', () => {
        const newName = 'new';
        const newLastName = 'lastname';
        // В методах (командах) описываются действия а сами проверки....
        cy.updateProfile(newName, newLastName);
        // ...сами проверки описываем тут что ожидаем в результате дейтвий
        // проверяем что обновленное value внутри инпута
        cy.get('[data-testid="ProfileCard.firstname"]').should('have.value', newName);
        cy.get('[data-testid="ProfileCard.lastname"]').should('have.value', newLastName);
    });
});
