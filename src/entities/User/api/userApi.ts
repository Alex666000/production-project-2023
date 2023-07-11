import {JsonSettings} from '../model/types/jsonSettings';
import {rtkApi} from '@/shared/api/rtkApi';
import {User} from '..';


interface SetJsonSettingsArg {
    userId: string;
    jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // SetJsonSettingsArg - ответ от бэка === пользователь вернется
        setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
            query: ({userId, jsonSettings}) => ({
                url: `/users/${userId}`,
                // обновляем лишь одно поле у user
                method: 'PATCH',
                body: {
                    jsonSettings,
                },
            }),
        }),
    }),
});

export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate;
