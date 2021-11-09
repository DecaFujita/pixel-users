        // import { status } from '../utils.js';

export function auth(credentials) {
    return fetch('http://127.0.0.1:8000/api/authenticate/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })        
    .then(resp => resp.json())
    .catch(e => {
        console.log(e);
    })
}

export function register(userData) {
    return fetch('http://127.0.0.1:8000/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(resp => resp.json())
    .catch(e => {
        console.log(e);
    })
    // .then(status).catch(e => {console.log(e)});
}

export function changePass(userData, userId, token) {
    return fetch(`http://127.0.0.1:8000/api/users/${userId}/change_pass/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(userData)
    })
    .then(resp => resp.json())
    .catch(e => {
        console.log(e);
    })
}

export function uploadAvatar(id, data) {
    return fetch(`http://127.0.0.1:8000/api/profile/${id}/`, {
        method: 'PUT', //Updating API
        body: data
    })
    .then(resp => resp.json())
    .catch(e => {
        console.log(e);
    })
}

export function fetchAvatar(id) {
    return fetch(`http://127.0.0.1:8000/api/profile/${id}/`)
    .then(resp => console.log(resp.json()))
    .catch(e => {
        console.log(e);
    })
}

export function userInfo(id) {
    return fetch(`http://127.0.0.1:8000/api/users/${id}/`)
    .then(resp => console.log(resp.json()))
    .catch(e => {
        console.log(e);
    })
}
