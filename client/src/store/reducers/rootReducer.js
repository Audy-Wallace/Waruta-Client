import { combineReducers } from 'redux';
import orderMidtransReducer from './orderReducer';
import singleplayerReducer from './singleplayerReducer';
const rootReducer = combineReducers({ singleplayerReducer, midtrans: orderMidtransReducer });
export default rootReducer;