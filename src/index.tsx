import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from '@components/app/app';
import { store } from '@redux/configure-store';
import 'normalize.css';
import 'antd/dist/antd.css'
import './index.scss';
import { ModalContextProvider } from '@processes/modal';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ModalContextProvider>
                <App />
            </ModalContextProvider>
        </Provider>
    </React.StrictMode>,
);
