import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; //导入thunk
import reducers from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};
