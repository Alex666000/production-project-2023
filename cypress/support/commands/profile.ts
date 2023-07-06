// Функция обновления профиля updateProfile
export const updateProfile = (firstName: string, lastName: string) => {
    // ПОСЛЕДОВАТЕЛЬНО ОПИСЫВАЕМ ЧТО МЫ ХОТИМ В БРАУЗЕРЕ СДЕЛАТЬ:

    // нажимаем на кнопку "Редактировать"
    cy.getByTestId('EditableProfileCardHeader.EditButton').click();
    // clear() - очистит значение в инпуте - type() вводить значения в инпут
    cy.get('[data-testid="ProfileCard.firstname"]').clear().type('new');
    cy.get('[data-testid="ProfileCard.lastname"]').clear().type('lastname');
    cy.get('[data-testid="EditableProfileCardHeader.SaveButton"]').click();
};

// Функция сброса профиля чтобы тест могли много раз прогонять  и чтобы каждый раз
// выполнялся с одними и  теми же данными
// resetProfile - чтобы не вводить данные в интерфейсе cypress
export const resetProfile = (profileId: string) => {
    return cy.request({
        method: 'PUT',
        url: `http://localhost:8000/profile/${profileId}`,
        headers: { Authorization: 'asasf' },
        body: {
            // из БД сущность
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
            updateProfile(firstName: string, lastName: string): Chainable<void>;

            resetProfile(profileId: string): Chainable<void>;
        }
    }
}
/*
- Выносим в отдельные команды тк это может переиспользоваться  ни только на стрнице
 профиля

- Добавляем эти команды в commands.ts - В команды cypress-a

- Вызываем методы(команды  в файле тестов) profile-edit.cy.ts

/ data-testId должны быть навешены на соответствующие элементы
 */
