import axios from "axios";

const mainURL = `http://dmsuat.eastus.cloudapp.azure.com/`;

export const login = (_username, _password) => {
  const loginURL = `filemanagement/user_management/users/login`;

  return axios.post(
    mainURL + loginURL,
    {
      username: _username,
      password: _password
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export const getUserInfo = (sessionKey) => {
  const loginURL = `/filemanagement/user_management/profile/getProfile?userId=11`;
  return axios.get(mainURL + loginURL, {
    headers: {
      "Authorization" : "Bearer "+ sessionKey
    }
  });
}