import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: string;
    email: string;
}

export interface UserState {
    expires: number;
    token: string | null;
    user: User | null;
}

const defaultState: UserState = {
    expires:
        typeof window !== "undefined" && localStorage.getItem("expires")
            ? parseInt(localStorage.getItem("expires")!)
            : 0,
    token:
        typeof window !== "undefined" && localStorage.getItem("token")
            ? localStorage.getItem("token")
            : "",
    user:
        typeof window !== "undefined" && localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")!)
            : null,
};

const userSlice = createSlice({
    name: "user",
    initialState: defaultState,
    reducers: {
        updateUser(
            state,
            action: PayloadAction<{ token: string; expires: string; user: User }>
        ) {
            state.token = action.payload.token;
            state.expires = parseInt(action.payload.expires);
            state.user = action.payload.user;
            if(typeof window !== "undefined"){
                localStorage.setItem("token", state.token!);
                localStorage.setItem("expires", state.expires.toString());
                localStorage.setItem("user", JSON.stringify(state.user));
            }
        },
        logoutUser(state) {
            state.token = "";
            state.expires = 0;
            state.user = null;
            if(typeof window !== "undefined"){
                localStorage.removeItem("token");
                localStorage.removeItem("expires");
                localStorage.removeItem("user");
            }
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice;
