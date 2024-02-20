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
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
