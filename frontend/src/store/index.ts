import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/slice';

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
















// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';


// const rootReducer = combineReducers({


// });

// // Redux Persist configuration
// const persistConfig = {
//     key: 'root', // Key to store the persisted data in storage
//     storage, // Use localStorage as the storage mechanism
// };
  
// // Create a persisted reducer based on the configuration
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure the Redux store
// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         // Disable the serializable check for specific Redux Persist actions
//         serializableCheck: {
//           ignoredActions: ['persist/PERSIST'], // Ignore non-serializable actions from Redux Persist
//         },
//       }),
// });
  
// // Create the Persistor instance for managing persistence
// export const persistor = persistStore(store);

// // Type definitions for state and dispatch
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


  