import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { authApi } from './api/auth-api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userSlice } from './model/user/user-slice';

export const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
        .concat(authApi.middleware)
});

export const history = createBrowserHistory()

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch)