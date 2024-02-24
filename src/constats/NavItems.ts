export interface IList{
    label:string,
    path:string,
    disabled:boolean
}

export default function useNavItems(username: string=''):IList[]{
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
            label:'Ваш профиль',
            path:'/profile',
            disabled:false
        });
        navItems.push({
            label:`"${username}" - Выйти`,
            path:'/logout',
            disabled:false
        });
    }else{
        navItems.push({
            label:"Войти",
            path:'/Login',
            disabled:false
        });
        navItems.push({
            label:"Зарегистрироваться",
            path:'/signup',
            disabled:false
        });
    }
    return navItems;
}