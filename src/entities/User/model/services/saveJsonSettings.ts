import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';

export const saveJsonSettings = createAsyncThunk<
    // на вход ожидаем
    JsonSettings,
    // на выход ожидаем
    JsonSettings,
    ThunkConfig<string>
    >('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    // достаем инфу о текущем пользователе
    const userData = getUserAuthData(getState());
    // достаем текущие настроики
    const currentSettings = getJsonSettings(getState());

    if (!userData) {
        // пробросим ошибку
        return rejectWithValue('');
    }

    try {
        // отправляем запрос
        const response = await dispatch(
            setJsonSettingsMutation({
                userId: userData.id,
                jsonSettings: {
                    ...currentSettings,
                    ...newJsonSettings,
                },
            }),
        ).unwrap();

        if (!response.jsonSettings) {
            // пробросим ошибку
            return rejectWithValue('');
        }

        return response.jsonSettings;
    } catch (e) {
        console.log(e);
        return rejectWithValue('');
    }
});

