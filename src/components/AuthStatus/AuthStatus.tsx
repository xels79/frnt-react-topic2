
//import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/UseAuth'
export default function AuthStatus() {
    const auth = useAuth();
    //const navigate = useNavigate();

    if (!auth.user) {
        return <p>You are not logged in.</p>;
    }

    return (<p></p>);
}  