import { FeatureFlags } from '@/shared/types/featureFlags';

// ФИЧИ НЕ МЕНЯЮТСЯ В ХОДЕ СЕССИИ, ИХ НЕОБЯЗАТЕЛЬНО ДЕЛАТЬ РЕАКТИВНЫМИ!
// к константе снаружи доступ не имеем
let featureFlags: FeatureFlags;


// с помощью гетеров и сетеров новые значения фичей сохраняем в константу
// мы подгрузили данные о пользователи и отрисовали интерфейс уже с новыми ФФ
export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

// к константе снаружи доступ не имеем напряиую чтобы не изменить ее случайно...
// если хотим прочитать флажок какой-то то будем использовать "геттер": вызываем
// функцию передаем туда флаг по ключу по названию ключа и достаем  нужное значение, а
// для того чтобы эти ФФ-ги в эту константу положить мы используем "сеттер" setFeatureFlags
export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags[flag];
}
