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
import Forbidden from './routes/Forbidden/Forbidden'
import YoutProfile from './routes/YourProfile/YourProfile'
import './App.css'
//forbidden
export default function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/index" element={<Index />} />
          <Route 
            path="/logout" 
            element={<Logout />} 
          />
          <Route element={ <RequireAuth/> }>
            <Route 
              path="/profile" 
              element={<YoutProfile />} 
            />
            <Route
              path="/boards/:ownedbyuser?/page?/:routepage?/board?/:boardNum?"
              element={ <Boards /> }
            />
          </Route>
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}
