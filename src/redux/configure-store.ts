import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { authApi } from './auth/api/auth-api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authSlice } from './auth/model';
import { feedbacksApi } from './feedbacks/api';
import { feedbacksSlice } from './feedbacks/model';
import { trainingsApi } from './trainings/api';

export const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [feedbacksApi.reducerPath]: feedbacksApi.reducer,
        [feedbacksSlice.name]: feedbacksSlice.reducer,
        [trainingsApi.reducerPath]: trainingsApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(feedbacksApi.middleware)
        .concat(trainingsApi.middleware)
});

export const history = createBrowserHistory()

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch)