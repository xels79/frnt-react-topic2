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
import './App.css'
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}