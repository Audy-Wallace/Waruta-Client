import { combineReducers } from "redux";
import wordReducer from "./wordReducer";
import leaderboardReducer from "./leaderboardReducer";

const rootReducer = combineReducers({
  words: wordReducer,
  leaderboards: leaderboardReducer,
});
export default rootReducer;
