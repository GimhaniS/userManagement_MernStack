import { createStore, applyMiddleware, compose } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
  // Root
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
  blacklist: [],
};

let composeEnhancer = compose;
if (__DEV__) {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)));
const persistor = persistStore(store);

export { store, persistor };
