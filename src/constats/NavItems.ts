export interface IList{
    label:string,
    path:string,
    disabled:boolean
}

export default function useNavItems(username: string='', userCount:number = 0):IList[]{
    const navItems:IList[] = [
        {
            label:'Главная',
            path:'/',
            disabled:false
        }, 
        {
            label:'Доски',
            path:"/boards",
            disabled:!username
        }, 
    ];
    if (username){
        navItems.push({
            label:`"${username}" - Выйти`,
            path:'/logout',
            disabled:false
        });
    }else{
        if (userCount){
            navItems.push({
                label:"Войти",
                path:'/Login',
                disabled:false
            });
        }
        navItems.push({
            label:"Зарегистрироваться",
            path:'/signup',
            disabled:false
        });
    }
    return navItems;
}