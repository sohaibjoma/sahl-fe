import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from './theme';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './redux/store';
import App from './modules/App';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </Provider>
);
