import { useForm } from 'react-hook-form';
import SignUpComponent from '../../components/SignUpComponent/SignUpComponent'
import { useEffect } from 'react';
export default function YourProfile(){
    const methods = useForm<IUser>();
    const {
        handleSubmit,
        reset,
        setError,
    } = methods;
    useEffect(()=>{
        if (errors){
            errors.forEach(({ name, type, message }) => setError(name as 'password'|'username', {type, message}));
        }
        },[errors, redirectTo, isSignUpSuccess]);


    return <SignUpComponent/>
}