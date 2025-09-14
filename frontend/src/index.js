import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './responsive.css';
import App from './App';
import { BooksContextProvider } from './context/BooksContext';

import { setDefaultOptions } from 'date-fns';
import { de } from 'date-fns/locale';
setDefaultOptions({ locale: de });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BooksContextProvider>
      <App />
    </BooksContextProvider>
  </React.StrictMode>
)