import { client } from './';


const url = '/api/users';



export function fetchUsers() {
    return dispatch => {
        dispatch({
            type: 'FETCH_USERS',
            payload: client.get(url)
        })
    }
}

export function newUser() {
    return dispatch => {
        dispatch({
            type: 'NEW_User'
        })
    }
}

export function saveUser(user) {
    return dispatch => {
        return dispatch({
            type: 'SAVE_USER',
            payload: client.post(url, user)
        })
    }
}




export function loginUser(loginUser) {


    var loginResponse = client.get(url + '?userName=' + loginUser.userName + '&password=' + loginUser.password);

    var data = {
        user: loginResponse,
        loginUser: loginUser
    }

    return dispatch => {
        return dispatch({
            type: 'LOGIN_USER_FULFILLED',
            payload: data
        })
    }
}


export function fetchUser(loginUser) {
    return dispatch => {
        return dispatch({
            type: 'FETCH_USER',
            payload: client.get(url + '?userName=' + loginUser.userName + '&password=' + loginUser.password)
        })
    }
}

export function updateUser(user) {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_USER',
            payload: client.put(`${url}/${user._id}`, user)
        })
    }
}

export function deleteUser(_id) {
    return dispatch => {
        return dispatch({
            type: 'DELETE_USER',
            payload: client.delete(`${url}/${_id}`)
        })
    }
}

export function ToggleBool(boolValue) {
    return dispatch => {
        return dispatch({
            type: 'TOGGLE',
            payload: boolValue
        })
    }
}

export function setUserName(name) {
    return dispatch => {
        return dispatch({
            type: 'SET_NAME',
            payload: name
        })
    }
}

export function getUserName() {
    return dispatch => {
        return dispatch({
            type: 'GET_NAME'
        })
    }
}

export function resetFlag() {
    return dispatch => {
        return dispatch({
            type: 'RESET_FLAG'
        })
    }
}

export function setLogin(userModel) {
    return dispatch => {
        return dispatch({
            type: 'SET_LOGIN',
            payload: userModel

        })
    }
}

export function progressIncrease(value) {
    return dispatch => {
        return dispatch({
            type: 'PROG_INC',
            payload: value

        })
    }
}

export function setUserFromSession(user) {
    return dispatch => {
        return dispatch({
            type: 'SET_USER_FROM_SESSION',
            payload: user

        })
    }
}

