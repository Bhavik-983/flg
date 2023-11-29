/* eslint-disable import/no-extraneous-dependencies */
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './app';
import { store, persistor } from './store';
import addAuthTokenInterceptor from './lib/addAuthTokenInterceptor';

addAuthTokenInterceptor(store);

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StoreProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
        <SnackbarProvider>
          <BrowserRouter>
            <Suspense>
              <App />
            </Suspense>
          </BrowserRouter>
        </SnackbarProvider>
      </HelmetProvider>
    </PersistGate>
  </StoreProvider>
);
