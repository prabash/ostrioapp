import axios from "axios";

const mainURL = `http://dmsuat.eastus.cloudapp.azure.com/`;

export const login = (_username, _password) => {
  const loginURL = `filemanagement/user_management/users/login`;

  axios.post(
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
  ).then(res => {
      console.log(res.data);
  });
};
