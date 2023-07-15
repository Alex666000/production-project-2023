import { matchPath, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppRouteByPathPattern, AppRoutes } from '@/shared/const/router';

export function useRouteChange() {
    const location = useLocation();
    // по дефолту main страницу укажем
    const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN);

    useEffect(() => {
        // проходимся в цикле  по всем маршрутамкоторые у нас в приложении есть (как
        // раз объект что обьявили сопоставление... достаем pattern - кусок пути где
        // указываем id, articles.... route - название пути)
        Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
            // matchPath - функцию умеет сопаставлять
            if (matchPath(pattern, location.pathname)) {
                setAppRoute(route);
            }
        });
    }, [location.pathname]);

    return appRoute;
}
/*
Прошли по всем путям - нашли путь который соответствует текущеи открытои странице и
 вернули сопоставление  название самого роута
 */
