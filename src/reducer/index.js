import {combineReducers} from "redux";
import cartQty from "./cartQty";

const rootReducer = combineReducers({
    qty: cartQty,
})

export default rootReducer;