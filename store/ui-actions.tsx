import { Dispatch } from 'redux';
import { uiActions, Notification } from './ui-slice';

export const showNotification = (notificationSettings: Notification, timeout: number = 3000) => async (dispatch: Dispatch) => {
    dispatch(uiActions.pushNotification(notificationSettings));
    if (timeout !== -1) {
        setTimeout(() => {
            dispatch(uiActions.removeLastNotification());
        }, timeout);
    }
};
