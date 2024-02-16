export interface IList{
    label:string,
    path:string
}

export default function useNavItems(username: string=''):IList[]{
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
    if (username){
        navItems.push({
            label:`"${username}" - Выйти`,
            path:'/logout'
        });
    }else{
        navItems.push({
            label:"Регистрация",
            path:'/signup'
        });
    }
    return navItems;
}