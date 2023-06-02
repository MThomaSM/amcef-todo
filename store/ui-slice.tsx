import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
    id?: number
    status: string;
    message: string;
}

export interface UIState {
    notifications: Notification[];
}

const initialState: UIState = {
    notifications: [],
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        pushNotification(state, action: PayloadAction<Notification>) {
            state.notifications.push({
                id: Math.random(),
                status: action.payload.status,
                message: action.payload.message
            });
        },
        clearNotification(state) {
            state.notifications = [];
        },
        removeLastNotification(state) {
            state.notifications.shift();
        },
        removeNotification(state, action: PayloadAction<number>) {
            state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
        }
    }
});
export const uiActions = uiSlice.actions;

export default uiSlice;
