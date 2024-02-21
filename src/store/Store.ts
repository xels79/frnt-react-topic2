import { configureStore } from "@reduxjs/toolkit";
import auth from './slice/auth/authSlice';
//import logger from 'redux-logger';
const store = configureStore({
    reducer:{auth},
    devTools:true,
//    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
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


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;