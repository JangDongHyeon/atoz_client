import { takeLatest, put, all, call, fork, takeEvery } from 'redux-saga/effects';
import {
    QNA_GET_REQUEST, QNA_GET_SUCCESS, QNA_GET_FAILURE,
    QNA_ADD_REQUEST,
    QNA_ADD_FAILURE,
    QNA_ADD_SUCCESS,
    QNA_SEARCH_REQUEST,
    QNA_SEARCH_FAILURE,
    QNA_SEARCH_SUCCESS,
    QNA_DELETE_REQUEST,
    QNA_DELETE_FAILURE,
    QNA_DELETE_SUCCESS,
    QNA_READ_REQUEST,
    QNA_READ_FAILURE,
    QNA_READ_SUCCESS,
    QNA_UPDATE_REQUEST,
    QNA_UPDATE_FAILURE,
    QNA_UPDATE_SUCCESS,
    QNA_UPLOAD_IMAGES_REQUEST,
    QNA_UPLOAD_IMAGES_FAILURE,
    QNA_UPLOAD_IMAGES_SUCCESS,

    QNA_RELATED_REQUEST,
    QNA_RELATED_FAILURE,
    QNA_RELATED_SUCCESS,
    QNA_NOT_GET_SUCCESS,
    QNA_NOT_GET_FAILURE,
    QNA_NOT_GET_REQUEST,

    QNA_REMOVE_UPDATE_IMAGE_REQUEST,
    QNA_REMOVE_UPDATE_IMAGE_FAILURE,
    QNA_REMOVE_UPDATE_IMAGE_SUCCESS,
    ANSWER_DELETE_SUCCESS,
} from '../actions/types';
import axios from 'axios'


function qnaGetAPI(data) {

    if (data.check)
        return axios.get(`/question/list?lastId=${data.lastId}`);
    else
        return axios.get(`/question/list?lastId=${0}`);
}


function* qnaGet(action) {
    try {

        const result = yield call(qnaGetAPI, action.data);
        console.log(result.data)
        yield put({
            type: QNA_GET_SUCCESS,
            data: { data: result.data, check: action.data.check ? false : true },
        });




    }
    catch (error) {
        console.error(error);
        yield put({
            type: QNA_GET_FAILURE,
            error: error.response.data,
        });
    }
}

function qnaNotGetAPI(data) {
    return axios.post('/question/notList', data);
}


function* qnaNotGet(action) {
    try {

        const result = yield call(qnaNotGetAPI, action.data);

        yield put({
            type: QNA_NOT_GET_SUCCESS,
            data: result.data,
        });




    }
    catch (error) {
        console.error(error);
        yield put({
            type: QNA_NOT_GET_FAILURE,
            error: error.response.data,
        });
    }
}

function qnaSearchAPI(data) {
    return axios.get(`/question/search?search=${data.search}`);
}


function* qnaSearch(action) {
    try {

        const result = yield call(qnaSearchAPI, action.data);

        yield put({
            type: QNA_SEARCH_SUCCESS,
            data: result.data,
        });


    }
    catch (error) {
        console.error(error);
        yield put({
            type: QNA_SEARCH_FAILURE,
            error: error.response.data,
        });
    }
}

function qnaUploadImagesAPI(data) {
    return axios.post('/question/images', data);
}

function* qnaUploadImages(action) {
    try {
        console.log('2222222222222222222222222222222')
        const result = yield call(qnaUploadImagesAPI, action.data);
        yield put({
            type: QNA_UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: QNA_UPLOAD_IMAGES_FAILURE,
            error: err.response.data,
        });
    }
}




function qnaRelatedGetAPI(data) {
    return axios.post('/question/related', data);
}


function* qnaRelatedGet(action) {
    try {

        const result = yield call(qnaRelatedGetAPI, action.data);

        yield put({
            type: QNA_RELATED_SUCCESS,
            data: result.data,
        });



    }
    catch (error) {
        console.error(error);
        yield put({
            type: QNA_RELATED_FAILURE,
            error: error.response.data,
        });
    }
}

function qnaReadAPI(data) {
    return axios.get(`/question/${data.qnaId}`);
}


function* qnaRead(action) {
    try {

        const result = yield call(qnaReadAPI, action.data);

        yield put({
            type: QNA_READ_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: QNA_READ_FAILURE,
            error: error.response.data,
        });
    }
}


function qnaAddAPI(data) {

    return axios.post('/question/add', data);
}


function* qnaAdd(action) {
    try {

        const result = yield call(qnaAddAPI, action.data);
        console.log(result.data)
        yield put({
            type: QNA_ADD_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {

        console.error(error);
        yield put({
            type: QNA_ADD_FAILURE,
            error: error.response.data.error,
        });
    }
}

function qnaUpdateAPI(data) {

    return axios.post(`/question/update`, data);
}


function* qnaUpdate(action) {
    try {

        const result = yield call(qnaUpdateAPI, action.data);

        yield put({
            type: QNA_UPDATE_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {

        console.error(error);
        yield put({
            type: QNA_UPDATE_FAILURE,
            error: error.response.data.error,
        });
    }
}

function qnaUpdateImageDeleteAPI(data) {

    return axios.post(`/question/image/delete`, data);
}


function* qnaUpdateImageDelete(action) {
    try {

        const result = yield call(qnaUpdateImageDeleteAPI, action.data);

        yield put({
            type: QNA_REMOVE_UPDATE_IMAGE_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {

        console.error(error);
        yield put({
            type: QNA_REMOVE_UPDATE_IMAGE_FAILURE,
            error: error.response.data.error,
        });
    }
}

function qnaDeleteAPI(data) {

    return axios.delete(`/question/${data.qnaId}`);
}

function* qnaDelete(action) {
    try {

        const result = yield call(qnaDeleteAPI, action.data);
        console.log(result.data)
        yield put({
            type: QNA_DELETE_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ANSWER_DELETE_SUCCESS,
            data: result.data,
        });
    }
    catch (error) {
        console.error(error);
        yield put({
            type: QNA_DELETE_FAILURE,
            error: error.response.data,
        });
    }
}


export function* watchQnaRelatedGet() {

    yield takeLatest(QNA_RELATED_REQUEST, qnaRelatedGet);
}

export function* watchQnaNotGet() {

    yield takeLatest(QNA_NOT_GET_REQUEST, qnaNotGet);
}

export function* watchQnaUploadImages() {
    yield takeLatest(QNA_UPLOAD_IMAGES_REQUEST, qnaUploadImages);
}

export function* watchQnaGet() {

    yield takeLatest(QNA_GET_REQUEST, qnaGet);
}

export function* watchQnaSearchGet() {

    yield takeLatest(QNA_SEARCH_REQUEST, qnaSearch);
}

export function* watchQnaRead() {

    yield takeLatest(QNA_READ_REQUEST, qnaRead);
}

export function* watchQnaAdd() {

    yield takeEvery(QNA_ADD_REQUEST, qnaAdd);
}
export function* watchQnaUpdate() {

    yield takeLatest(QNA_UPDATE_REQUEST, qnaUpdate);
}

export function* watchQnaDelete() {

    yield takeLatest(QNA_DELETE_REQUEST, qnaDelete);
}

export function* watchQnaDeleteImage() {

    yield takeLatest(QNA_REMOVE_UPDATE_IMAGE_REQUEST, qnaUpdateImageDelete);
}

export default function* qnaSaga() {
    yield all([
        fork(watchQnaNotGet),
        fork(watchQnaGet),
        fork(watchQnaRelatedGet),
        fork(watchQnaUploadImages),
        fork(watchQnaRead),
        fork(watchQnaAdd),
        fork(watchQnaDelete),
        fork(watchQnaUpdate),
        fork(watchQnaSearchGet),
        fork(watchQnaDeleteImage)
    ]);
}