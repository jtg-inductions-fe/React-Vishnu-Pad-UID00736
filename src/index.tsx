import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from 'App';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from '@theme';

import { store } from './store';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 3000,
                            style: {
                                background: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                                border: `1px solid ${theme.palette.divider}`,
                            },
                        }}
                    />
                    <App />
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);
