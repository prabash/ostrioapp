import axios from "axios";

const mainURL = `http://dmsuat.eastus.cloudapp.azure.com/OSTRIOMobile/PRAppService/PRDataService.svc/`;

export const getAllPRInfo = (name, test) => {
   
    //const URL = `https://api.github.com/users/${username}`;
    const URL = `https://demo9906147.mockable.io/get/allPRs`;
    return axios.get(URL).then(res => res);
}

export const getPRHeaderById = (PRHeaderId) => {
    const URL = mainURL + `GetPRDetailsById/${PRHeaderId}/Header`;
    return axios.get(URL).then(res => res);
}

export const getPRLineById = (PRLineId) => {
    const URL = mainURL + `GetPRDetailsById/${PRLineId}/Detail`;
    return axios.get(URL).then(res => res);
}

export const getPRInfoPaging = (skip, take) => {
    const URL = mainURL + `GetPRDetails/${skip}/${take}`;
    return axios.get(URL).then(res => res);
}