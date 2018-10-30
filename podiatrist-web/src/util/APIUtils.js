import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function apiLogin(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getAllPatientData() {
    return request({
        url: API_BASE_URL + "/patient/all",
        method: 'GET'
    });
}

export function addPatient(patient) {
    return request({
        url: API_BASE_URL + "/patient/add",
        method: 'POST',
        body: JSON.stringify(patient)
    });
}

export function deletePatient(patient) {
    return request({
        url: API_BASE_URL + "/patient/delete",
        method: 'POST',
        body: JSON.stringify(patient)
    });
}

export function getPatientData(id) {
    return request({
        url: API_BASE_URL + "/patient/get?id=" + id,
        method: 'GET'
    });
}

export function editPatient(patient) {
    return request({
        url: API_BASE_URL + "/patient/edit",
        method: 'POST',
        body: JSON.stringify(patient)
    });
}