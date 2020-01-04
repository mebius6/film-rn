import { combineReducers } from 'redux';
import account from './modules/account'; // 账户相关

const reducer = combineReducers({ account });

export default reducer;
