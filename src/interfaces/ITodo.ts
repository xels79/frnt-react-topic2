// | string - что-бы не городить для ошибок.
export interface ITodoAction{
    id:number|string,
    name:string,
    status:number|string,
    created_a:string,
    updated_at:string,
    todo_id:string
}
export interface ITodo{
    id:number|string,
    name:string,
    created_a:string,
    updated_at:string,
    todoActions:ITodoAction[]|string
}
export type TTodoActionKeys = Record<(keyof ITodoAction), string>;
export type TTodosKeys = Record<(keyof ITodo), string>;
export interface ITodoServerErrors{
    fields:TTodoActionKeys | TTodosKeys,
    message:string,
    name?:string,
    type?:string
}
