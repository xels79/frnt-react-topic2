import { ITodo } from './../../../interfaces/ITodo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const TodosQuryApi = createApi({
    reducerPath: 'tdsQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        TDSGetAll: builder.query<ITodo[], void|number>({
            query: (id) => !id?`todos?expand=todoActions`:`todos?expand=todoActions&filter[user_id]=${id}`,
            providesTags: (result) =>
                result ? result.map(({ id }) => ({ type: 'Todos', id })) : ['Todos'],
            transformResponse: (responseData: any, meta, ha: any) => {
                // Output 1（ Response header  X-Pagination-Current-Page: 1）
                console.log(responseData);
                console.log(ha);
                console.log(meta);
                console.log(meta?.response?.headers.get('X-Pagination-Current-Page'))
                if (meta?.response?.headers){
                    responseData.XPGN = meta.response.headers.get('X-Pagination-Current-Page');
                }
                return responseData;
            },
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useTDSGetAllQuery } = TodosQuryApi