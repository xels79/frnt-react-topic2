// import useAuth from '../../hooks/UseAuth'
import { useLocation, Navigate } from 'react-router-dom'
import { RootState } from '../../store/Store';
import { useSelector } from 'react-redux';
export default function RequireAuth({ children }: { children: JSX.Element }) {
    // const auth = useAuth();
    const location = useLocation();
    const isAuth = useSelector((state:RootState)=>state.auth.user!==null);
  
    if (!isAuth) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }
  