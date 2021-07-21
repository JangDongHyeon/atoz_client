import { takeLatest, put, all, call, fork, takeEvery } from 'redux-saga/effects';
import {
    ANSWER_GET_REQUEST, ANSWER_GET_SUCCESS, ANSWER_GET_FAILURE,
    ANSWER_ADD_REQUEST,
    ANSWER_ADD_FAILURE,
    ANSWER_ADD_SUCCESS,
    ANSWER_SEARCH_REQUEST,
    ANSWER_SEARCH_FAILURE,
    ANSWER_SEARCH_SUCCESS,
    ANSWER_DELETE_REQUEST,
    ANSWER_DELETE_FAILURE,
    ANSWER_DELETE_SUCCESS,
    ANSWER_READ_REQUEST,
    ANSWER_READ_FAILURE,
    ANSWER_READ_SUCCESS,
    ANSWER_UPDATE_REQUEST,
    ANSWER_UPDATE_FAILURE,
    ANSWER_UPDATE_SUCCESS,
    ANSWER_UPLOAD_IMAGES_REQUEST,
    ANSWER_UPLOAD_IMAGES_FAILURE,
    ANSWER_UPLOAD_IMAGES_SUCCESS,

    ANSWER_RELATED_REQUEST,
    ANSWER_RELATED_FAILURE,
    ANSWER_RELATED_SUCCESS,
    ANSWER_NOT_GET_SUCCESS,
    ANSWER_NOT_GET_FAILURE,
    ANSWER_NOT_GET_REQUEST,

    ANSWER_REMOVE_UPDATE_IMAGE_REQUEST,
    ANSWER_REMOVE_UPDATE_IMAGE_FAILURE,
    ANSWER_REMOVE_UPDATE_IMAGE_SUCCESS,
} from '../actions/types';
import axios from 'axios'


function answerGetAPI(data) {

    if (data.check)
        return axios.get(`/answer/list?lastId=${data.lastId}&state=${data.state}`);
    else
        return axios.get(`/answer/list?lastId=${0}&state=${data.state}`);
}


function* answerGet(action) {
    try {

        const result = yield call(answerGetAPI, action.data);
        console.log(result.data)
        yield put({
            type: ANSWER_GET_SUCCESS,
            data: { data: result.data, check: action.data.check ? false : true },
        });




    }
    catch (error) {
        console.error(error);
        yield put({
            type: ANSWER_GET_FAILURE,
            error: error.response.data,
        });
    }
}

function answerNotGetAPI(data) {
    return axios.post('/answer/notList', data);
}


function* answerNotGet(action) {
    try {

        const result = yield call(answerNotGetAPI, action.data);

        yield put({
            type: ANSWER_NOT_GET_SUCCESS,
            data: result.data,
        });




    }
    catch (error) {
        console.error(error);
        yield put({
            type: ANSWER_NOT_GET_FAILURE,
            error: error.response.data,
        });
    }
}

function answerSearchAPI(data) {
    return axios.get(`/answer/search?search=${data.search}`);
}


function* answerSearch(action) {
    try {

        const result = yield call(answerSearchAPI, action.data);

        yield put({
            type: ANSWER_SEARCH_SUCCESS,
            data: result.data,
        });


    }
    catch (error) {
        console.error(error);
        yield put({
            type: ANSWER_SEARCH_FAILURE,
            error: error.response.data,
        });
    }
}

function answerUploadImagesAPI(data) {
    return axios.post('/answer/images', data);
}

function* answerUploadImages(action) {
    try {
        console.log('2222222222222222222222222222222')
        const result = yield call(answerUploadImagesAPI, action.data);
        yield put({
            type: ANSWER_UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: ANSWER_UPLOAD_IMAGES_FAILURE,
            error: err.response.data,
        });
    }
}




function answerRelatedGetAPI(data) {
    return axios.post('/answer/related', data);
}


function* answerRelatedGet(action) {
    try {

        const result = yield call(answerRelatedGetAPI, action.data);

        yield put({
            type: ANSWER_RELATED_SUCCESS,
            data: result.data,
        });



    }
    catch (error) {
        console.error(error);
        yield put({
            type: ANSWER_RELATED_FAILURE,
            error: error.response.data,
        });
    }
}

function answerReadAPI(data) {
    return axios.get(`/answer/${data.answerId}`);
}


function* answerRead(action) {
    try {

        const result = yield call(answerReadAPI, action.data);

        yield put({
            type: ANSWER_READ_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: ANSWER_READ_FAILURE,
            error: error.response.data,
        });
    }
}


function answerAddAPI(data) {

    return axios.post('/answer/add', data);
}


function* answerAdd(action) {
    try {

        const result = yield call(answerAddAPI, action.data);
        console.log(result.data)
        yield put({
            type: ANSWER_ADD_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {

        console.error(error);
        yield put({
            type: ANSWER_ADD_FAILURE,
            error: error.response.data.error,
        });
    }
}

function answerUpdateAPI(data) {

    return axios.post(`/answer/update`, data);
}


function* answerUpdate(action) {
    try {

        const result = yield call(answerUpdateAPI, action.data);

        yield put({
            type: ANSWER_UPDATE_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {

        console.error(error);
        yield put({
            type: ANSWER_UPDATE_FAILURE,
            error: error.response.data.error,
        });
    }
}

function answerUpdateImageDeleteAPI(data) {

    return axios.post(`/answer/image/delete`, data);
}


function* answerUpdateImageDelete(action) {
    try {

        const result = yield call(answerUpdateImageDeleteAPI, action.data);

        yield put({
            type: ANSWER_REMOVE_UPDATE_IMAGE_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {

        console.error(error);
        yield put({
            type: ANSWER_REMOVE_UPDATE_IMAGE_FAILURE,
            error: error.response.data.error,
        });
    }
}

function answerDeleteAPI(data) {

    return axios.delete(`/answer/${data.answerId}/${data.questionId}`);
}

function* answerDelete(action) {
    try {

        const result = yield call(answerDeleteAPI, action.data);
        console.log(result.data)
        yield put({
            type: ANSWER_DELETE_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: ANSWER_DELETE_FAILURE,
            error: error.response.data,
        });
    }
}


export function* watchAnswerRelatedGet() {

    yield takeLatest(ANSWER_RELATED_REQUEST, answerRelatedGet);
}

export function* watchAnswerNotGet() {

    yield takeLatest(ANSWER_NOT_GET_REQUEST, answerNotGet);
}

export function* watchAnswerUploadImages() {
    yield takeLatest(ANSWER_UPLOAD_IMAGES_REQUEST, answerUploadImages);
}

export function* watchAnswerGet() {

    yield takeLatest(ANSWER_GET_REQUEST, answerGet);
}

export function* watchAnswerSearchGet() {

    yield takeLatest(ANSWER_SEARCH_REQUEST, answerSearch);
}

export function* watchAnswerRead() {

    yield takeLatest(ANSWER_READ_REQUEST, answerRead);
}

export function* watchAnswerAdd() {

    yield takeEvery(ANSWER_ADD_REQUEST, answerAdd);
}
export function* watchAnswerUpdate() {

    yield takeLatest(ANSWER_UPDATE_REQUEST, answerUpdate);
}

export function* watchAnswerDelete() {

    yield takeLatest(ANSWER_DELETE_REQUEST, answerDelete);
}

export function* watchAnswerDeleteImage() {

    yield takeLatest(ANSWER_REMOVE_UPDATE_IMAGE_REQUEST, answerUpdateImageDelete);
}

export default function* answerSaga() {
    yield all([
        fork(watchAnswerNotGet),
        fork(watchAnswerGet),
        fork(watchAnswerRelatedGet),
        fork(watchAnswerUploadImages),
        fork(watchAnswerRead),
        fork(watchAnswerAdd),
        fork(watchAnswerDelete),
        fork(watchAnswerUpdate),
        fork(watchAnswerSearchGet),
        fork(watchAnswerDeleteImage)
    ]);
}