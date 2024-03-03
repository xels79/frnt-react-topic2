import { ITodo, ITodoAction, ITodoWithPagination } from './../../../interfaces/ITodo';
import { FetchBaseQueryMeta, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
const  createPagination = (resp:Response):{
    currentPage:number,
    pageCount:number
    perPage:number,
    totalCount:number
}=>{
    return {
        currentPage:+(resp.headers.get('X-Pagination-Current-Page') as string),
        pageCount:+(resp.headers.get('X-Pagination-Page-Count') as string),
        perPage:+(resp.headers.get('X-Pagination-Per-Page') as string),
        totalCount:+(resp.headers.get('X-Pagination-Total-Count') as string)
    };
};
const transformResponse = (responseData: any, meta:FetchBaseQueryMeta | undefined) => {
    // Output 1（ Response header  X-Pagination-Current-Page: 1）
    console.log('TodosQuery: transformResponse');
    responseData={todos:responseData};
    if (meta?.response?.headers){
        responseData.pagination=createPagination(meta.response);
    }
    return responseData;
};


export const TodosQuryApi = createApi({
    reducerPath: 'tdsQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Todos','TodoActions', 'Todo'],
    endpoints: (builder) => ({
        TDSGetAll: builder.query<ITodoWithPagination, void|{userId?:number,page?:number,pageSize?:number}>({
            query: (inData) => {
                let url = 'todos?expand=todoActions,user';
                if (inData && inData.userId){
                    url+=`&filter[user_id]=${inData.userId}`;
                }
                if (inData && inData.page){
                    url+=`&page=${inData.page}`;
                }
                if (inData && inData.pageSize){
                    url+=`&per-page=${inData.pageSize}`;
                }
                return url;
            },
            providesTags: (result) =>
                result ? result.todos.map(({ id }) => ({ type: 'Todos', id })) : ['Todos'],
            transformResponse: transformResponse,
        }),
        TDSGetCreateNew:builder.mutation<ITodoWithPagination, {name:string, user_id:number}>({
            query:(inData) => ({
                url:'todos',
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(inData)
            }),
            invalidatesTags:['Todos', 'TodoActions'],
            transformResponse: transformResponse,
        }),
        TDSUpdate:builder.mutation<ITodoWithPagination, ITodo>({
            query:(inData) => ({
                url:`todos/${inData.id}`,
                method:"PUT",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name:inData.name})
            }),
            invalidatesTags:['Todos'],
            transformResponse: transformResponse,
        }),
        TDSDelete:builder.mutation<ITodoWithPagination, number>({
            query:(inData) => ({
                url:`todos/${inData}`,
                method:"DELETE",
                headers:{
                    'Content-Type':'application/json'
                },
                // body:JSON.stringify({name:inData.name})
            }),
            invalidatesTags:['Todos'],
            transformResponse: transformResponse,
        }),
        TDSGetTodo: builder.query<ITodo, number>({
            query: (inData) => {
                return `todos/${inData}?fields=name`;
            },
            providesTags: (result) =>result ? [{type:'Todo',id:result.id}]:['Todo'],
        }),
        TDSGetTodoActions: builder.query<ITodoAction[], {todo__id:number, status:number[]}>({
            query: (inData)=>`todo-actions?filter[todo_id]=${inData.todo__id}`+inData.status.reduce((acc,val,index)=>acc+`&filter[status][${index}]=${val}`,''),
            providesTags: (result) =>
                result ? result.map(({ id }) => ({ type: 'TodoActions', id })) : ['TodoActions'],

        }),
        TDSUpdateActionState: builder.mutation<ITodoAction, {id:number, status:number}>({
            query: (inData) => ({
                url:`todo-actions/${inData.id}`,
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({status:inData.status})
            }),
            invalidatesTags:['Todos', 'Todo', 'TodoActions'],
        }),
        TDSUpdateActionName: builder.mutation<ITodoAction, {id:number, name:string}>({
            query: (inData) => ({
                url:`todo-actions/${inData.id}`,
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name:inData.name})
            }),
            invalidatesTags:['Todos', 'Todo', 'TodoActions'],
        }),
        TDSCreateAction: builder.mutation<ITodoAction, {name:string, todo_id:number}>({
            query: (inData) => ({
                url:`todo-actions`,
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name:inData.name, todo_id:inData.todo_id})
            }),
            invalidatesTags:['Todos', 'Todo', 'TodoActions'],
        }),
        TDSDeleteAction: builder.mutation<ITodoAction, number>({
            query: (inData) => ({
                url:`todo-actions/${inData}`,
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                },
            }),
            invalidatesTags:['Todos', 'Todo', 'TodoActions'],
        })
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
    useTDSGetAllQuery,
    useTDSGetCreateNewMutation,
    useTDSUpdateMutation,
    useTDSDeleteMutation,
    useTDSGetTodoQuery,
    useTDSUpdateActionStateMutation,
    useTDSCreateActionMutation,
    useTDSDeleteActionMutation,
    useTDSUpdateActionNameMutation,
    useTDSGetTodoActionsQuery
} = TodosQuryApi