import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account-reducer";

export default configureStore({
    reducer: {
        account: accountReducer
    }
});