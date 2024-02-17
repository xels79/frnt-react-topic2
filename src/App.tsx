/* eslint-disable  @typescript-eslint/no-explicit-any */

import {
  Routes,
  Route,
} from "react-router-dom";
import AuthProvider from './providers/AuthProvider'
import RequireAuth from './components/RequireAuth/RequireAuth'
import Layout from "./components/Layout/Layout";
import Login from "./routes/Login/Login";
import Logout from "./routes/Logout/Logout";
import SignUp from "./routes/SignUp/SignUp";
import NotFound from './routes/NotFound/NotFound';
import Boards from './routes/Boards/Boards';
import './App.css'
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/logout" 
            element={
              <RequireAuth>
                <Logout />
              </RequireAuth>
            } 
          />
          <Route
            path="/boards"
            element={
              <RequireAuth>
                <Boards />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

