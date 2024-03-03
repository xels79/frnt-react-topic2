import { TodosQuryApi } from './slice/Todos/TodosQuery';
import { Middleware, MiddlewareAPI, configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import auth from './slice/auth/authSlice';
import UserRest from './slice/UserREST/UserRESTSlice'
import TodoSlice from './slice/Todos/TodosSlice'
import MessageSlice from './slice/messages/MessageSlice'
import LogoutThunk from './slice/auth/LogoutThunk';
import breadCrumbs from './slice/breadcrumbs/BreadCrumbsSlice'
//import logger from 'redux-logger';
export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI<AppDispatch>) => (next) => (action) => {
        // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
        if (isRejectedWithValue(action)) {
            console.warn('We got a rejected action!')
            if (action.payload){
                const err = action.payload as {status?:number, data:{status?:number, name?:string, message?:string}};
                if (err.status && err.status!==200){
                    console.warn("Ошибка запроса на сервер");
                    if (err.status===401){
                        console.warn("Требуется авторизация.");
                        api.dispatch(LogoutThunk(null));
                    }else{
                        console.warn("Пропускаем")
                        console.warn(err);
                    }
                }
            }
        }
        return next(action)
    }
const store = configureStore({
    reducer:{ auth, UserRest, MessageSlice, TodoSlice, breadCrumbs,[TodosQuryApi.reducerPath]: TodosQuryApi.reducer },
    devTools:true,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(rtkQueryErrorLogger).concat(TodosQuryApi.middleware),

});
// Create the middleware instance and methods
//const listenerMiddleware = createListenerMiddleware()

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
// listenerMiddleware.startListening({
//   actionCreator: auth,
//   effect: async (action, listenerApi) => {
//     // Run whatever additional side-effect-y logic you want here
//     console.log('Todo added: ', action.payload)
//   }
// });

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;