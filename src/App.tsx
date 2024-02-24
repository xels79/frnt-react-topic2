/* eslint-disable  @typescript-eslint/no-explicit-any */

import {
  Routes,
  Route,
} from "react-router-dom";
import RequireAuth from './components/RequireAuth/RequireAuth'
import Layout from "./components/Layout/Layout";
import Logout from "./routes/Logout/Logout";
import NotFound from './routes/NotFound/NotFound';
import Boards from './routes/Boards/Boards';
import Index from "./routes/Index/Index";
import YoutProfile from './routes/YourProfile/YourProfile'
import './App.css'
export default function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/index" element={<Index />} />
          <Route 
            path="/profile" 
            element={<RequireAuth><YoutProfile /></RequireAuth>} 
          />
          <Route 
            path="/logout" 
            element={<Logout />} 
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
  );
}
