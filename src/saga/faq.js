import { takeLatest, put, all, call, fork, takeEvery } from 'redux-saga/effects';
import {
    FAQ_GET_REQUEST, FAQ_GET_SUCCESS, FAQ_GET_FAILURE,
    FAQ_ADD_REQUEST,
    FAQ_ADD_FAILURE,
    FAQ_ADD_SUCCESS,
    FAQ_SEARCH_REQUEST,
    FAQ_SEARCH_FAILURE,
    FAQ_SEARCH_SUCCESS,
    FAQ_DELETE_REQUEST,
    FAQ_DELETE_FAILURE,
    FAQ_DELETE_SUCCESS,
    FAQ_READ_REQUEST,
    FAQ_READ_FAILURE,
    FAQ_READ_SUCCESS,
    FAQ_UPDATE_REQUEST,
    FAQ_UPDATE_FAILURE,
    FAQ_UPDATE_SUCCESS,
    FAQ_UPLOAD_IMAGES_REQUEST,
    FAQ_UPLOAD_IMAGES_FAILURE,
    FAQ_UPLOAD_IMAGES_SUCCESS,

    FAQ_RELATED_REQUEST,
    FAQ_RELATED_FAILURE,
    FAQ_RELATED_SUCCESS,
    FAQ_NOT_GET_SUCCESS,
    FAQ_NOT_GET_FAILURE,
    FAQ_NOT_GET_REQUEST,

    FAQ_REMOVE_UPDATE_IMAGE_REQUEST,
    FAQ_REMOVE_UPDATE_IMAGE_FAILURE,
    FAQ_REMOVE_UPDATE_IMAGE_SUCCESS,
} from '../actions/types';
import axios from 'axios'


function faqGetAPI(data) {

    if (data.check)
        return axios.get(`/faq/list?lastId=${data.lastId}&search=${data.search}`);
    else
        return axios.get(`/faq/list?lastId=${0}&search=${data.search}`);
}


function* faqGet(action) {
    try {

        const result = yield call(faqGetAPI, action.data);

        yield put({
            type: FAQ_GET_SUCCESS,
            data: { data: result.data, check: action.data.check ? false : true },
        });




    }
    catch (error) {
        console.error(error);
        yield put({
            type: FAQ_GET_FAILURE,
            error: error.response.data,
        });
    }
}

function faqNotGetAPI(data) {
    return axios.post('/faq/notList', data);
}


function* faqNotGet(action) {
    try {

        const result = yield call(faqNotGetAPI, action.data);

        yield put({
            type: FAQ_NOT_GET_SUCCESS,
            data: result.data,
        });




    }
    catch (error) {
        console.error(error);
        yield put({
            type: FAQ_NOT_GET_FAILURE,
            error: error.response.data,
        });
    }
}

function faqSearchAPI(data) {
    return axios.get(`/faq/search?search=${data.search}`);
}


function* faqSearch(action) {
    try {

        const result = yield call(faqSearchAPI, action.data);

        yield put({
            type: FAQ_SEARCH_SUCCESS,
            data: result.data,
        });


    }
    catch (error) {
        console.error(error);
        yield put({
            type: FAQ_SEARCH_FAILURE,
            error: error.response.data,
        });
    }
}

function faqUploadImagesAPI(data) {
    return axios.post('/faq/images', data);
}

function* faqUploadImages(action) {
    try {
        console.log('2222222222222222222222222222222')
        const result = yield call(faqUploadImagesAPI, action.data);
        yield put({
            type: FAQ_UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: FAQ_UPLOAD_IMAGES_FAILURE,
            error: err.response.data,
        });
    }
}




function faqRelatedGetAPI(data) {
    return axios.post('/faq/related', data);
}


function* faqRelatedGet(action) {
    try {

        const result = yield call(faqRelatedGetAPI, action.data);

        yield put({
            type: FAQ_RELATED_SUCCESS,
            data: result.data,
        });



    }
    catch (error) {
        console.error(error);
        yield put({
            type: FAQ_RELATED_FAILURE,
            error: error.response.data,
        });
    }
}

function faqReadAPI(data) {
    return axios.get(`/faq/${data.faqId}`);
}


function* faqRead(action) {
    try {

        const result = yield call(faqReadAPI, action.data);

        yield put({
            type: FAQ_READ_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: FAQ_READ_FAILURE,
            error: error.response.data,
        });
    }
}


function faqAddAPI(data) {

    return axios.post('/faq/add', data);
}


function* faqAdd(action) {
    try {
        console.log(action.data)
        const result = yield call(faqAddAPI, action.data);
        console.log(result.data)
        yield put({
            type: FAQ_ADD_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {

        console.error(error);
        yield put({
            type: FAQ_ADD_FAILURE,
            error: error.response.data.error,
        });
    }
}

function faqUpdateAPI(data) {

    return axios.post(`/faq/update`, data);
}


function* faqUpdate(action) {
    try {

        const result = yield call(faqUpdateAPI, action.data);

        yield put({
            type: FAQ_UPDATE_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {

        console.error(error);
        yield put({
            type: FAQ_UPDATE_FAILURE,
            error: error.response.data.error,
        });
    }
}

function faqUpdateImageDeleteAPI(data) {

    return axios.post(`/faq/image/delete`, data);
}


function* faqUpdateImageDelete(action) {
    try {

        const result = yield call(faqUpdateImageDeleteAPI, action.data);

        yield put({
            type: FAQ_REMOVE_UPDATE_IMAGE_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {

        console.error(error);
        yield put({
            type: FAQ_REMOVE_UPDATE_IMAGE_FAILURE,
            error: error.response.data.error,
        });
    }
}

function faqDeleteAPI(data) {

    return axios.delete(`/faq/${data.faqId}`);
}

function* faqDelete(action) {
    try {

        const result = yield call(faqDeleteAPI, action.data);
        console.log(result.data)
        yield put({
            type: FAQ_DELETE_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: FAQ_DELETE_FAILURE,
            error: error.response.data,
        });
    }
}


export function* watchFaqRelatedGet() {

    yield takeLatest(FAQ_RELATED_REQUEST, faqRelatedGet);
}

export function* watchFaqNotGet() {

    yield takeLatest(FAQ_NOT_GET_REQUEST, faqNotGet);
}

export function* watchFaqUploadImages() {
    yield takeLatest(FAQ_UPLOAD_IMAGES_REQUEST, faqUploadImages);
}

export function* watchFaqGet() {

    yield takeLatest(FAQ_GET_REQUEST, faqGet);
}

export function* watchFaqSearchGet() {

    yield takeLatest(FAQ_SEARCH_REQUEST, faqSearch);
}

export function* watchFaqRead() {

    yield takeLatest(FAQ_READ_REQUEST, faqRead);
}

export function* watchFaqAdd() {

    yield takeEvery(FAQ_ADD_REQUEST, faqAdd);
}
export function* watchFaqUpdate() {

    yield takeLatest(FAQ_UPDATE_REQUEST, faqUpdate);
}

export function* watchFaqDelete() {

    yield takeLatest(FAQ_DELETE_REQUEST, faqDelete);
}

export function* watchFaqDeleteImage() {

    yield takeLatest(FAQ_REMOVE_UPDATE_IMAGE_REQUEST, faqUpdateImageDelete);
}

export default function* faqSaga() {
    yield all([
        fork(watchFaqNotGet),
        fork(watchFaqGet),
        fork(watchFaqRelatedGet),
        fork(watchFaqUploadImages),
        fork(watchFaqRead),
        fork(watchFaqAdd),
        fork(watchFaqDelete),
        fork(watchFaqUpdate),
        fork(watchFaqSearchGet),
        fork(watchFaqDeleteImage)
    ]);
}