import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/UseAuth'
import { useEffect } from 'react';
export default function Logout(){
    const auth = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        auth.signout(() => navigate("/"));
    });
    return null;
}