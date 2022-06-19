import { GET_WORDS } from "../actions/actionType";
const initialState = {
  words: [],
  solution: "",
};
function wordReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WORDS:
      return {
        ...state,
        words: action.payload.words,
        solution: action.payload.solution,
      };
    default:
      return state;
  }
}
export default wordReducer;
