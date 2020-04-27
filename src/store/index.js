import { createStore } from 'redux';
import usuarioReducer from './usuarioReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import expireReducer from 'redux-persist-expire';

const persistConfig = {
    key: 'webNews',
    storage,
    transforms: [
        expireReducer('expirationKey', {
          persistedAtKey: '__persisted_at',
          expireSeconds: 3600,
        })
     ]
}

const persistedReducer = persistReducer(persistConfig, usuarioReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store)

export { store, persistor };