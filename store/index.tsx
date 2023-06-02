import {applyMiddleware, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import userSlice from "@/store/user-slice";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        user: userSlice.reducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
