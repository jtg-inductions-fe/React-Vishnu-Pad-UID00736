import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from 'App';
import { BrowserRouter } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from '@theme';

/**
 * We grab the empty <div id="root"> from our main index.html file.
 * This is the blank canvas where our entire React application will be drawn.
 */
const rootElement = document.getElementById('root') as HTMLElement;

/**
 * Start the React application and render it inside the root element.
 * We wrap our main <App /> in a few important helper tools:
 *
 * - StrictMode: React's built-in tool that helps catch bugs and warnings during development.
 * - ThemeProvider: Makes our custom colors, fonts, and styles available everywhere.
 * - CssBaseline: Clears out default browser styles so our app looks consistent on Chrome, Safari, etc.
 * - BrowserRouter: Turns on the routing engine so we can click links and change pages.
 */
createRoot(rootElement).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
);
