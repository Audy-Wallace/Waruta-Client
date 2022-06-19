import { GET_SNAP_MIDTRANS, UPDATE_USER_PREMIUM } from "./actionTypes";
import axios from "axios";
function getMidtransSnap(payload) {
    return {
        type: GET_SNAP_MIDTRANS,
        payload,
    };
}

function updateUserPremium(payload) {
    return {
        type: UPDATE_USER_PREMIUM,
        payload
    };
}

export function finishOrder() {
    return async (dispatch) => {
        try {
            const { data: response } = await axios.get("http://localhost:3000/users/midtrans");
            const payload = response
            return await dispatch(getMidtransSnap(payload))
        }
        catch (error) {
            console.log(error);
        }
    }
}

export function updatePremium() {
    return async (dispatch) => {
        try {
            const { data: response } = await axios.patch("http://localhost:3000/users/premium")
            const payload = response
            return await dispatch(updateUserPremium(payload))
        }
        catch (error) {
            console.log(error);
        }
    }
}
