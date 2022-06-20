import { GET_LEADERBOARD } from "../actions/actionType";
const initialState = {
  leaderboards: [],
};
function leaderboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LEADERBOARD:
      return {
        ...state,
        leaderboards: action.payload,
      };
    default:
      return state;
  }
}
export default leaderboardReducer;
