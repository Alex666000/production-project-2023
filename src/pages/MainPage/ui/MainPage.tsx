import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <Page data-testid="MainPage">
            <div>{t('Это главная страница. Тут будет контент для неё')}</div>
            {t('Главная страница')}
        </Page>
    );
};

export default MainPage;
