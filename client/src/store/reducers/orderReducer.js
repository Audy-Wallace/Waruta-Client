import { GET_SNAP_MIDTRANS, UPDATE_USER_PREMIUM } from "../actions/actionTypes";
const initialState = {
    snap: {}
};

function orderMidtransReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SNAP_MIDTRANS:
            return { ...state, snap: action.payload };
        case UPDATE_USER_PREMIUM:
            return { ...state, snap: action.payload };
        default:
            return state;
    }
}
export default orderMidtransReducer;