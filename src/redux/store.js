import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage,
}

export const rootReducers = combineReducers({
  'todoStore': todoReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducers
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})


export const persistor = persistStore(store)
