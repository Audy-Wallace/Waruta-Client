import { GET_WORDS_SINGLEPLAYER_ACTION } from "../actions/actionTypes";
const initialState = {
  words: [],
  solution: "",
};
function singleplayerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WORDS_SINGLEPLAYER_ACTION:
      return { ...state, words: action.payload, solution: action.solution };
    default:
      return state;
  }
}
export default singleplayerReducer;
