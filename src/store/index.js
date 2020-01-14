import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; //导入thunk
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk));
export {store};
