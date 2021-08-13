import { takeLatest, put, all, call, fork, takeEvery } from 'redux-saga/effects';
import {
    POST_GET_REQUEST, POST_GET_SUCCESS, POST_GET_FAILURE,
    POST_ADD_REQUEST,
    POST_ADD_FAILURE,
    POST_ADD_SUCCESS,
    POST_SEARCH_REQUEST,
    POST_SEARCH_FAILURE,
    POST_SEARCH_SUCCESS,
    POST_DELETE_REQUEST,
    POST_DELETE_FAILURE,
    POST_DELETE_SUCCESS,
    POST_READ_REQUEST,
    POST_READ_FAILURE,
    POST_READ_SUCCESS,
    POST_UPDATE_REQUEST,
    POST_UPDATE_FAILURE,
    POST_UPDATE_SUCCESS,
    POST_UPLOAD_IMAGES_REQUEST,
    POST_UPLOAD_IMAGES_FAILURE,
    POST_UPLOAD_IMAGES_SUCCESS,

    POST_RELATED_REQUEST,
    POST_RELATED_FAILURE,
    POST_RELATED_SUCCESS,
    POST_NOT_GET_SUCCESS,
    POST_NOT_GET_FAILURE,
    POST_NOT_GET_REQUEST,

    POST_REMOVE_UPDATE_IMAGE_REQUEST,
    POST_REMOVE_UPDATE_IMAGE_FAILURE,
    POST_REMOVE_UPDATE_IMAGE_SUCCESS,
} from '../actions/types';
import axios from 'axios'


function postGetAPI(data) {

    if (data.check)
        return axios.get(`/post/list?lastId=${data.lastId}&search=${data.search}`);
    else
        return axios.get(`/post/list?lastId=${0}&search=${data.search}`);
}


function* postGet(action) {
    try {

        const result = yield call(postGetAPI, action.data);

        yield put({
            type: POST_GET_SUCCESS,
            data: { data: result.data, check: action.data.check ? false : true },
        });




    }
    catch (error) {
        console.error(error);
        yield put({
            type: POST_GET_FAILURE,
            error: error.response.data,
        });
    }
}

function postNotGetAPI(data) {
    return axios.post('/post/notList', data);
}


function* postNotGet(action) {
    try {

        const result = yield call(postNotGetAPI, action.data);

        yield put({
            type: POST_NOT_GET_SUCCESS,
            data: result.data,
        });




    }
    catch (error) {
        console.error(error);
        yield put({
            type: POST_NOT_GET_FAILURE,
            error: error.response.data,
        });
    }
}

function postSearchAPI(data) {
    return axios.get(`/post/search?search=${data.search}`);
}


function* postSearch(action) {
    try {

        const result = yield call(postSearchAPI, action.data);

        yield put({
            type: POST_SEARCH_SUCCESS,
            data: result.data,
        });


    }
    catch (error) {
        console.error(error);
        yield put({
            type: POST_SEARCH_FAILURE,
            error: error.response.data,
        });
    }
}

function postUploadImagesAPI(data) {
    return axios.post('/post/images', data);
}

function* postUploadImages(action) {
    try {
        console.log('2222222222222222222222222222222')
        const result = yield call(postUploadImagesAPI, action.data);
        yield put({
            type: POST_UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: POST_UPLOAD_IMAGES_FAILURE,
            error: err.response.data,
        });
    }
}




function postRelatedGetAPI(data) {
    return axios.post('/post/related', data);
}


function* postRelatedGet(action) {
    try {

        const result = yield call(postRelatedGetAPI, action.data);

        yield put({
            type: POST_RELATED_SUCCESS,
            data: result.data,
        });



    }
    catch (error) {
        console.error(error);
        yield put({
            type: POST_RELATED_FAILURE,
            error: error.response.data,
        });
    }
}

function postReadAPI(data) {
    return axios.get(`/post/${data.postId}`);
}


function* postRead(action) {
    try {

        const result = yield call(postReadAPI, action.data);

        yield put({
            type: POST_READ_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: POST_READ_FAILURE,
            error: error.response.data,
        });
    }
}


function postAddAPI(data) {

    return axios.post('/post/add', data);
}


function* postAdd(action) {
    try {

        const result = yield call(postAddAPI, action.data);
        console.log(result.data)
        yield put({
            type: POST_ADD_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {

        console.error(error);
        yield put({
            type: POST_ADD_FAILURE,
            error: error.response.data.error,
        });
    }
}

function postUpdateAPI(data) {

    return axios.post(`/post/update`, data);
}


function* postUpdate(action) {
    try {

        const result = yield call(postUpdateAPI, action.data);

        yield put({
            type: POST_UPDATE_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {

        console.error(error);
        yield put({
            type: POST_UPDATE_FAILURE,
            error: error.response.data.error,
        });
    }
}

function postUpdateImageDeleteAPI(data) {

    return axios.post(`/post/image/delete`, data);
}


function* postUpdateImageDelete(action) {
    try {

        const result = yield call(postUpdateImageDeleteAPI, action.data);

        yield put({
            type: POST_REMOVE_UPDATE_IMAGE_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {

        console.error(error);
        yield put({
            type: POST_REMOVE_UPDATE_IMAGE_FAILURE,
            error: error.response.data.error,
        });
    }
}

function postDeleteAPI(data) {

    return axios.delete(`/post/${data.postId}`);
}

function* postDelete(action) {
    try {

        const result = yield call(postDeleteAPI, action.data);
        console.log(result.data)
        yield put({
            type: POST_DELETE_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: POST_DELETE_FAILURE,
            error: error.response.data,
        });
    }
}


export function* watchPostRelatedGet() {

    yield takeLatest(POST_RELATED_REQUEST, postRelatedGet);
}

export function* watchPostNotGet() {

    yield takeLatest(POST_NOT_GET_REQUEST, postNotGet);
}

export function* watchPostUploadImages() {
    yield takeLatest(POST_UPLOAD_IMAGES_REQUEST, postUploadImages);
}

export function* watchPostGet() {

    yield takeLatest(POST_GET_REQUEST, postGet);
}

export function* watchPostSearchGet() {

    yield takeLatest(POST_SEARCH_REQUEST, postSearch);
}

export function* watchPostRead() {

    yield takeLatest(POST_READ_REQUEST, postRead);
}

export function* watchPostAdd() {

    yield takeEvery(POST_ADD_REQUEST, postAdd);
}
export function* watchPostUpdate() {

    yield takeLatest(POST_UPDATE_REQUEST, postUpdate);
}

export function* watchPostDelete() {

    yield takeLatest(POST_DELETE_REQUEST, postDelete);
}

export function* watchPostDeleteImage() {

    yield takeLatest(POST_REMOVE_UPDATE_IMAGE_REQUEST, postUpdateImageDelete);
}

export default function* postSaga() {
    yield all([
        fork(watchPostNotGet),
        fork(watchPostGet),
        fork(watchPostRelatedGet),
        fork(watchPostUploadImages),
        fork(watchPostRead),
        fork(watchPostAdd),
        fork(watchPostDelete),
        fork(watchPostUpdate),
        fork(watchPostSearchGet),
        fork(watchPostDeleteImage)
    ]);
}