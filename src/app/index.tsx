import React from 'react';
import ReactDOM from 'react-dom/client';
import { Application } from './application';
import { Provider } from 'react-redux';
import store from './store';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Application />
    </Provider>
  </React.StrictMode>
);
