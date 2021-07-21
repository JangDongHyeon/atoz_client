import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {

    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    USER_PROFILE_REQUEST,
    USER_PROFILE_FAILURE,
    USER_PROFILE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_FAILURE,
    USER_UPDATE_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_SUCCESS,
    CONFIRM_REQUEST,
    CONFIRM_FAILURE,
    CONFIRM_SUCCESS,
    SOCIAL_LOGIN_SUCCESS,
    SOCIAL_LOGIN_FAILURE,
    SOCIAL_LOGIN_REQUEST,
    GET_CONU_TRAN_SUCCESS,
    GET_CONU_TRAN_FAILURE,
    GET_CONU_TRAN_REQUEST,
} from '../actions/types';
import setAuthToken from '../util/setAuthToken';

function updateAPI(data) {
    if (!data.check)
        return axios.post('/user/update', data);
    else
        return axios.post('/auth/update', data);
}

function* update(action) {
    try {
        const result = yield call(updateAPI, action.data);
        yield put({
            type: USER_UPDATE_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: USER_UPDATE_FAILURE,
            error: err.response.data,
        });
    }
}

function confirmAPI(data) {
    return axios.post('/auth/confirm/', data);
}

function* confirm(action) {
    try {
        const result = yield call(confirmAPI, action.data);
        yield put({
            type: CONFIRM_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: CONFIRM_FAILURE,
            error: err.response.data,
        });
    }
}

function socialLoginAPI(data) {
    return axios.post('/auth/social-login', data);
}

function* socialLogin(action) {
    try {
        const result = yield call(socialLoginAPI, action.data);


        yield put({
            type: SOCIAL_LOGIN_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: SOCIAL_LOGIN_FAILURE,
            error: err.response.data,
        });
    }
}


function logInAPI(data) {
    return axios.post('/auth/signin', data);
}

function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);


        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        });
    }
}

function logOutAPI() {
    return axios.get('/auth/signout');
}

function* logOut() {
    try {
        yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        });
    }
}

function signUpAPI(data) {

    return axios.post('/auth/signup', data);
}

function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);

        yield put({
            type: SIGN_UP_SUCCESS,
            data: result.data
        });
    } catch (err) {

        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
}

function loadUserAPI() {
    return axios.get(`/user/me`);
}

function* loadUser() {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        const result = yield call(loadUserAPI);

        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data,
        });


    } catch (error) {
        console.error(error);
        yield put({
            type: LOAD_USER_FAILURE,
            error: error.response.data,
        });
    }
}

function conuUserAPI() {
    return axios.get(`/user/conuta/list`);
}

function* conuUser() {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        const result = yield call(conuUserAPI);

        yield put({
            type: GET_CONU_TRAN_SUCCESS,
            data: result.data,
        });


    } catch (error) {
        console.error(error);
        yield put({
            type: GET_CONU_TRAN_FAILURE,
            error: error.response.data,
        });
    }
}



// function profileAPI(data) {
//     return axios.get(`/user/${data}`);
// }

// function* profile(action) {
//     try {
//         const result = yield call(profileAPI, action.data);

//         yield put({
//             type: USER_PROFILE_SUCCESS,
//             data: result.data,
//         });


//     } catch (error) {
//         console.error(error);
//         yield put({
//             type: USER_PROFILE_FAILURE,
//             error: error.response.data,
//         });
//     }
// }

function profileAPI(data) {
    return axios.get(`/auth/${data}`);
}

function* profile(action) {
    try {
        const result = yield call(profileAPI, action.data);
        yield put({
            type: USER_PROFILE_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: USER_PROFILE_FAILURE,
            error: error.response.data,
        });
    }
}



function forgotPasswordAPI(data) {
    return axios.put('/auth/forgot-password', data);

}


function* forgotPassword(action) {
    try {
        const result = yield call(forgotPasswordAPI, action.data);

        yield put({
            type: FORGOT_PASSWORD_SUCCESS,
            data: result.data,
        });

    } catch (error) {
        console.error(error);
        yield put({
            type: FORGOT_PASSWORD_FAILURE,
            error: error.response.data,
        });
    }
}


function resetPasswordAPI(data) {
    return axios.put('/auth/reset-password', data);

}


function* resetPassword(action) {
    try {
        const result = yield call(resetPasswordAPI, action.data);

        yield put({
            type: RESET_PASSWORD_SUCCESS,
            data: result.data,
        });

    } catch (error) {
        console.error(error);
        yield put({
            type: RESET_PASSWORD_FAILURE,
            error: error.response.data,
        });
    }
}


function* watchProfile() {

    yield takeLatest(USER_PROFILE_REQUEST, profile);
}


function* watchLogIn() {

    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchUpdate() {

    yield takeLatest(USER_UPDATE_REQUEST, update);
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchConuUser() {
    yield takeLatest(GET_CONU_TRAN_REQUEST, conuUser);
}

function* watchforgotPassword() {
    yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPassword);
}

function* watchresetPassword() {
    yield takeLatest(RESET_PASSWORD_REQUEST, resetPassword);
}

function* watchConfirm() {
    yield takeLatest(CONFIRM_REQUEST, confirm);
}

function* watchSocialLogin() {
    yield takeLatest(SOCIAL_LOGIN_REQUEST, socialLogin);
}

export default function* userSaga() {
    yield all([
        fork(watchSocialLogin),
        fork(watchConfirm),
        fork(watchProfile),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchLoadUser),
        fork(watchUpdate),
        fork(watchforgotPassword),
        fork(watchresetPassword),
        fork(watchConuUser)
    ]);
}
