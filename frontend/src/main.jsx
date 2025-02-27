import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import  { persistor, store } from '../store/store.js';
import { GlobalProvider } from './context/context.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalProvider>

      <App />
      </GlobalProvider>
    </PersistGate>
  </Provider>,
  </StrictMode>,
)
