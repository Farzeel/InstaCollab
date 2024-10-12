import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from "./authSlice.js"
import postReducer from "./postSlice.js"


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
    auth:authReducer,
    post:postReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
