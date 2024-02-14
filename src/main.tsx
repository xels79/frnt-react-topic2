import React from 'react'
import ReactDOM from 'react-dom/client'
// import SignInSide from './routes/Login/SignInSide'
// import Login from './routes/Login/Login'
// import StickyFooter from './components2/StickyFooter/StickyFooter'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
