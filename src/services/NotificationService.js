import axios from "axios";

const mainURL = `http://219.92.4.33:8081/OSTRIOMobile/OSTPushNotificationService/PushNotification.svc/`;

export const registerUserToken = (_userId, _deviceId) => {
  const subURL = `registerdevice`;

  return axios.post(
    mainURL + subURL,
    {
      userId: _userId,
      deviceId: _deviceId
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};