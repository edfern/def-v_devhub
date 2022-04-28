import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/base.scss';

import configureStore from './reducers/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const store = configureStore();

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B98E0',
    },
    secondary: {
      main: '#f85149',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals())
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
