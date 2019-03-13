import axios from "axios";
import jwt_decode from "jwt-decode";

const mainURL = `http://219.92.4.33:8081/`;

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

export const getUserInfo = (_sessionKey, _userId) => {
  const loginURL = `/filemanagement/user_management/profile/getProfile?userId=${_userId}`;
  return axios.get(mainURL + loginURL, {
    headers: {
      Authorization: "Bearer " + _sessionKey
    }
  });
};

export const getSessionKeyDetails = _sessionKey => {
  var decoded = jwt_decode(_sessionKey);
  return decoded;
};
