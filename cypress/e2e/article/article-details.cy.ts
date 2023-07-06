// id текущей статьи с которой работаем в тесте
let currentArticleId = '';
describe('Пользователь заходит на страницу статьи', () => {
    beforeEach(() => {
        cy.login();
        // перед тест кейсами создаем статью - потом протестировать все необходимые
        // сценарии и потом ее удалить чтобы она не засоряла БД
        cy.createArticle().then((article) => {
            currentArticleId = article.id;

            // дебаг в случае ошибки чтобы посмотреть объект который получили от сервера article:
            /* console.log(JSON.stringify(article)); */

            // заходим на страницу этои статьи
            cy.visit(`articles/${article.id}`);
        });
    });
    afterEach(() => {
        // удаление статьи
        cy.removeArticle(currentArticleId);
    });

    // ТЕСТЫ - проверяем ожидания
    it('И видит содержимое статьи', () => {
        // статья успешно подгрузилась -здесь проверяем интеграцию с бэкендом - мы
        // получили какие-то данные и ожидаем что они должны отрисоваться
        cy.getByTestId('ArticleDetails.Info').should('exist');
    });

    it('И видит список рекоммендаций', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist');
    });

    it('И оставляет комментарий', () => {
        cy.getByTestId('ArticleDetails.Info');
        // скроллим к блоку AddCommentForm где оставляем сам коммент
        cy.getByTestId('AddCommentForm').scrollIntoView();
        // и когда проскроллили можем коммент отправить - передаем текст сюда и
        // отправляем его --- действие ----
        cy.addComment('text');
        // ожидаем что он 1 коммент
        cy.getByTestId('CommentCard.Content').should('have.length', 1);
    });
    it('И оставляет комментарий', () => {
        cy.getByTestId('ArticleDetails.Info');
        // скроллим к блоку AddCommentForm где оставляем сам коммент
        cy.getByTestId('AddCommentForm').scrollIntoView();
        // и когда проскроллили можем коммент отправить - передаем текст сюда и
        // отправляем его --- действие ----
        cy.addComment('text');
        // ожидаем что он 1 коммент
        cy.getByTestId('CommentCard.Content').should('have.length', 1);
    });

    // Тестируем оценивание статьи
    it('И ставит оценку', () => {
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(4, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 4);
    });
    it('И ставит оценку (пример с стабом на фикстурах)', () => {
        // мокаем запрос - вешаем интерцептор и на что его вешаем: отлавливаем такой
        // урл у которого кусочек пути /articles и указываем что в качестве фикстуры
        // используем article-details.json - ответ бэка будет это json файлик
        // ИТОГ: замокали запрос для получения конкретной статьи
        cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(4, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 4);
    });
});
