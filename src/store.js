import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";


const store = configureStore({
    reducer: {
        accountID: accountReducer,
    },
});

export default store;