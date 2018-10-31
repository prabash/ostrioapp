import axios from "axios";

export const getUserInfo = (name, test) => {
    let username = name.toLowerCase().trim();
    console.log("username :" + username);
    console.log("test :" + test);
    //const URL = `https://api.github.com/users/${username}`;
    const URL = `http://demo9906147.mockable.io/`;
    return axios.get(URL).then(res => res);
}
