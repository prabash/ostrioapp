import axios from "axios";

const mainURL = `http://219.92.4.33:8081/OSTRIOMobile/PRAppService/PRDataService.svc/`;

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

export const getPRInfoPaging = (skip, take, username) => {
    const URL = mainURL + `GetPRDetails/${skip}/${take}/${username}`;
    return axios.get(URL).then(res => res);
}