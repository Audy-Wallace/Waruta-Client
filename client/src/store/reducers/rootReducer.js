import {combineReducers} from 'redux';
import singleplayerReducer from './singleplayerReducer';
const rootReducer = combineReducers({singleplayerReducer});
export default rootReducer;