import axios from "axios";

const mainURL = `http://dmsuat.eastus.cloudapp.azure.com/OSTRIOMobile/PRAppService/PRDataService.svc/`;

export const getAllPRInfo = (name, test) => {
    let username = name.toLowerCase().trim();
    console.log("username :" + username);
    console.log("test :" + test);
    //const URL = `https://api.github.com/users/${username}`;
    const URL = `https://demo9906147.mockable.io/get/allPRs`;
    return axios.get(URL).then(res => res);
}

export const getPRHeaderById = (PRHeaderId) => {
    const URL = `http://demo9906147.mockable.io/get/PRHeader/`;
    return axios.get(URL).then(res => res);
}

export const getPRLineById = (PRHeaderId, PRLineId) => {
    const URL = `http://demo9906147.mockable.io/get/PRLine/`;
    return axios.get(URL).then(res => res);
}

export const getPRInfoPaging = (skip, take) => {
    const URL = mainURL + `GetPRDetails/${skip}/${take}`;
    return axios.get(URL).then(res => res);
}