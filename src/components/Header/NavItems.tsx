import useAuth from '../../hooks/UseAuth'
//import { useCallback, useMemo } from 'react';
export interface IList{
    label:string,
    path:string
}

export default function useNavItems(){
    const auth = useAuth();
    
    const navItems:IList[] = [
        {
            label:'Публичная',
            path:'/'
        }, 
        {
            label:'Защищенная',
            path:"/protected"
        }, 
    ];
    if (auth.user){
        navItems.push({
            label:`"${auth.user.username}" - Выйти`,
            path:'/logout'
        });
    }
    return navItems;
}