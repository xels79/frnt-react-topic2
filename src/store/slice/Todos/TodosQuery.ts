import { ITodoWithPagination } from './../../../interfaces/ITodo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const TodosQuryApi = createApi({
    reducerPath: 'tdsQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        TDSGetAll: builder.query<ITodoWithPagination, void|{userId?:number,page?:number,pageSize?:number}>({
            query: (inData) => {
                let url = 'todos?expand=todoActions';
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
            transformResponse: (responseData: any, meta) => {
                // Output 1（ Response header  X-Pagination-Current-Page: 1）
                console.log('TodosQuery: transformResponse');
                responseData={todos:responseData};
                if (meta?.response?.headers){
                    responseData.pagination={
                        currentPage:+(meta.response.headers.get('X-Pagination-Current-Page') as string),
                        pageCount:+(meta.response.headers.get('X-Pagination-Page-Count') as string),
                        perPage:+(meta.response.headers.get('X-Pagination-Per-Page') as string),
                        totalCount:+(meta.response.headers.get('X-Pagination-Total-Count') as string)
                    }
                }
                return responseData;
            },
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useTDSGetAllQuery } = TodosQuryApi