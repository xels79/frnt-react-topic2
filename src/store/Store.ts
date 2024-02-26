import { TodosQuryApi } from './slice/Todos/TodosQuery';
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import auth from './slice/auth/authSlice';
import UserRest from './slice/UserREST/UserRESTSlice'
import TodoSlice from './slice/Todos/TodosSlice'
//import logger from 'redux-logger';
const store = configureStore({
    reducer:{ auth, UserRest, TodoSlice,[TodosQuryApi.reducerPath]: TodosQuryApi.reducer, },
    devTools:true,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(TodosQuryApi.middleware),

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