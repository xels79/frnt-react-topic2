import React from 'react'
import ReactDOM from 'react-dom/client'
// import SignInSide from './routes/Login/SignInSide'
// import Login from './routes/Login/Login'
// import StickyFooter from './components2/StickyFooter/StickyFooter'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App'
import store from './store/Store';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';

const theme = createTheme(
  {
    // palette: {
    //   primary: { main: '#1976d2' },
    // },
  },
  ruRU,
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
