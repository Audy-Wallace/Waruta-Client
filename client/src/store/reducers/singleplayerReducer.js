import { GET_WORDS_SINGLEPLAYER_ACTION } from "../actions/actionTypes";
const initialState = {
  words: [],
};
function singleplayerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WORDS_SINGLEPLAYER_ACTION:
      return { ...state, words: action.payload };
    default:
      return state;
  }
}
export default singleplayerReducer;
