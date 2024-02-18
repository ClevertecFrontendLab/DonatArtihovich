import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

export const store = configureStore({
    reducer: {},
});

export const history = createBrowserHistory()

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
