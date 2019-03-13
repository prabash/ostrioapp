import { AsyncStorage } from "react-native";

export const USER_KEY = "-1";
export const NOTIFICATION_TOKEN = "0";

export const onSignIn = (_key) => AsyncStorage.setItem(USER_KEY, _key);

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const getSessionKey = () => AsyncStorage.getItem(USER_KEY);

export const saveNotifToken = (_notifToken) => AsyncStorage.setItem(NOTIFICATION_TOKEN, _notifToken);

export const getNotifToken = () => AsyncStorage.getItem(NOTIFICATION_TOKEN);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};