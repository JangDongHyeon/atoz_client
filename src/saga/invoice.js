import { takeLatest, put, all, call, fork, takeEvery } from 'redux-saga/effects';
import {
    INVOICE_GET_REQUEST,
    INVOICE_GET_SUCCESS,
    INVOICE_GET_FAILURE,
    INVOICE_ADD_REQUEST,
    INVOICE_ADD_FAILURE,
    INVOICE_ADD_SUCCESS,
    INVOICE_SEARCH_REQUEST,
    INVOICE_SEARCH_FAILURE,
    INVOICE_SEARCH_SUCCESS,
    INVOICE_DELETE_REQUEST,
    INVOICE_DELETE_FAILURE,
    INVOICE_DELETE_SUCCESS,
    INVOICE_READ_REQUEST,
    INVOICE_READ_FAILURE,
    INVOICE_READ_SUCCESS,
    INVOICE_UPDATE_REQUEST,
    INVOICE_UPDATE_FAILURE,
    INVOICE_UPDATE_SUCCESS,
    INVOICE_ADMIN_GET_REQUEST,
    INVOICE_ADMIN_GET_SUCCESS,
    INVOICE_ADMIN_GET_FAILURE,

    INVOICE_CHART_ADMIN_GET_REQUEST,
    INVOICE_CHART_ADMIN_GET_SUCCESS,
    INVOICE_CHART_ADMIN_GET_FAILURE,
    INVOICE_RELATED_REQUEST,
    INVOICE_RELATED_FAILURE,
    INVOICE_RELATED_SUCCESS,
    JJIM_LIKE_REQUEST,
    JJIM_LIKE_SUCCESS,
    JJIM_LIKE_FAILURE,
    JJIM_UNLIKE_REQUEST,
    JJIM_UNLIKE_SUCCESS,
    JJIM_UNLIKE_FAILURE,
    INVOICE_LIKE_GET_REQUEST,
    INVOICE_LIKE_GET_SUCCESS,
    INVOICE_LIKE_GET_FAILURE,
} from '../actions/types';
import axios from 'axios'


function invoiceGetAPI(data) {

    if (data.check)
        return axios.get(`/invoice/userList?lastId=${data.lastId}`);
    else
        return axios.get(`/invoice/userList?lastId=${0}`);
}


function* invoiceGet(action) {
    try {

        const result = yield call(invoiceGetAPI, action.data);

        yield put({
            type: INVOICE_GET_SUCCESS,
            data: { data: result.data, check: action.data.check ? false : true },
        });



    }
    catch (error) {
        console.error(error);
        yield put({
            type: INVOICE_GET_FAILURE,
            error: error.response.data,
        });
    }
}

function invoiceLikeGetAPI(data) {

    if (data.check)
        return axios.get(`/invoice/hartList?lastId=${data.lastId}`);
    else
        return axios.get(`/invoice/hartList?lastId=${0}`);
}


function* invoiceLikeGet(action) {
    try {

        const result = yield call(invoiceLikeGetAPI, action.data);

        yield put({
            type: INVOICE_LIKE_GET_SUCCESS,
            data: { data: result.data, check: action.data.check ? false : true },
        });



    }
    catch (error) {
        console.error(error);
        yield put({
            type: INVOICE_LIKE_GET_FAILURE,
            error: error.response.data,
        });
    }
}


function invoiceAdminGetAPI(data) {

    if (data.check)
        return axios.get(`/invoice/list?lastId=${data.lastId}`);
    else
        return axios.get(`/invoice/list?lastId=${0}`);
}


function* invoiceAdminGet(action) {
    try {

        const result = yield call(invoiceAdminGetAPI, action.data);

        yield put({
            type: INVOICE_ADMIN_GET_SUCCESS,
            data: { data: result.data, check: action.data.check ? false : true },
        });



    }
    catch (error) {
        console.error(error);
        yield put({
            type: INVOICE_ADMIN_GET_FAILURE,
            error: error.response.data,
        });
    }
}


function invoiceAdminChartGetAPI(data) {

    return axios.get(`/invoice/statistics?date=${data.date}`);

}


function* invoiceAdminChartGet(action) {
    try {

        const result = yield call(invoiceAdminChartGetAPI, action.data);

        yield put({
            type: INVOICE_CHART_ADMIN_GET_SUCCESS,
            data: { data: result.data },
        });



    }
    catch (error) {
        console.error(error);
        yield put({
            type: INVOICE_CHART_ADMIN_GET_FAILURE,
            error: error.response.data,
        });
    }
}


function invoiceSearchAPI(data) {
    return axios.post(`/invoice/search`, data);
}


function* invoiceSearch(action) {
    try {

        const result = yield call(invoiceSearchAPI, action.data);

        yield put({
            type: INVOICE_SEARCH_SUCCESS,
            data: result.data,
        });


    }
    catch (error) {
        console.error(error);
        yield put({
            type: INVOICE_SEARCH_FAILURE,
            error: error.response.data,
        });
    }
}





function invoiceRelatedGetAPI(data) {
    return axios.invoice('/invoice/related', data);
}


function* invoiceRelatedGet(action) {
    try {

        const result = yield call(invoiceRelatedGetAPI, action.data);

        yield put({
            type: INVOICE_RELATED_SUCCESS,
            data: result.data,
        });



    }
    catch (error) {
        console.error(error);
        yield put({
            type: INVOICE_RELATED_FAILURE,
            error: error.response.data,
        });
    }
}

function invoiceReadAPI(data) {
    return axios.get(`/invoice/${data.number}`);
}


function* invoiceRead(action) {
    try {

        const result = yield call(invoiceReadAPI, action.data);

        yield put({
            type: INVOICE_READ_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: INVOICE_READ_FAILURE,
            error: error.response.data,
        });
    }
}


function invoiceAddAPI(data) {

    return axios.invoice('/invoice/add', data);
}


function* invoiceAdd(action) {
    try {

        const result = yield call(invoiceAddAPI, action.data);
        console.log(result.data)
        yield put({
            type: INVOICE_ADD_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {

        console.error(error);
        yield put({
            type: INVOICE_ADD_FAILURE,
            error: error.response.data.error,
        });
    }
}

function invoiceUpdateAPI(data) {

    return axios.invoice(`/invoice/update`, data);
}


function* invoiceUpdate(action) {
    try {

        const result = yield call(invoiceUpdateAPI, action.data);

        yield put({
            type: INVOICE_UPDATE_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {

        console.error(error);
        yield put({
            type: INVOICE_UPDATE_FAILURE,
            error: error.response.data.error,
        });
    }
}



function invoiceDeleteAPI(data) {

    return axios.delete(`/invoice/${data.invoiceId}`);
}

function* invoiceDelete(action) {
    try {

        const result = yield call(invoiceDeleteAPI, action.data);
        console.log(result.data)
        yield put({
            type: INVOICE_DELETE_SUCCESS,
            data: result.data,
        });

    }
    catch (error) {
        console.error(error);
        yield put({
            type: INVOICE_DELETE_FAILURE,
            error: error.response.data,
        });
    }
}

function likeInvoiceAPI(data) {

    return axios.patch(`/invoice/like/${data.invoiceId}`);

}

function* likeInvoice(action) {
    try {

        const result = yield call(likeInvoiceAPI, action.data);

        yield put({
            type: JJIM_LIKE_SUCCESS,
            data: { userId: result.data.userId, invoiceId: action.data.invoiceId, check: action.data.check }
        });
        // yield put({
        //     type: JJIM_LIKE_PUSH,
        //     data: result.data.Invoices
        // })

    } catch (err) {
        console.error(err);
        yield put({
            type: JJIM_LIKE_FAILURE,
            data: err.response.data,
        });
    }
}

function unLikeInvoiceAPI(data) {
    return axios.delete(`/invoice/like/${data.invoiceId}`);
}

function* unLikeInvoice(action) {
    try {

        const result = yield call(unLikeInvoiceAPI, action.data);

        yield put({
            type: JJIM_UNLIKE_SUCCESS,
            data: { userId: result.data.userId, invoiceId: action.data.invoiceId, check: action.data.check }
        });
        // yield put({
        //     type: JJIM_UNLIKE_PUSH,
        //     data: result.data.FoodId
        // })

    } catch (err) {
        console.error(err);
        yield put({
            type: JJIM_UNLIKE_FAILURE,
            data: err.response.data,
        });
    }
}

export function* watchInvoiceRelatedGet() {

    yield takeLatest(INVOICE_RELATED_REQUEST, invoiceRelatedGet);
}

export function* watchInvoiceLikeGet() {

    yield takeLatest(INVOICE_LIKE_GET_REQUEST, invoiceLikeGet);
}

export function* watchInvoiceChartAdminGet() {

    yield takeLatest(INVOICE_CHART_ADMIN_GET_REQUEST, invoiceAdminChartGet);
}


export function* watchInvoiceGet() {

    yield takeLatest(INVOICE_GET_REQUEST, invoiceGet);
}

export function* watchInvoiceAdminGet() {

    yield takeLatest(INVOICE_ADMIN_GET_REQUEST, invoiceAdminGet);
}

export function* watchInvoiceSearchGet() {

    yield takeLatest(INVOICE_SEARCH_REQUEST, invoiceSearch);
}

export function* watchInvoiceRead() {

    yield takeLatest(INVOICE_READ_REQUEST, invoiceRead);
}

export function* watchInvoiceAdd() {

    yield takeEvery(INVOICE_ADD_REQUEST, invoiceAdd);
}
export function* watchInvoiceUpdate() {

    yield takeLatest(INVOICE_UPDATE_REQUEST, invoiceUpdate);
}

export function* watchInvoiceDelete() {

    yield takeLatest(INVOICE_DELETE_REQUEST, invoiceDelete);
}

function* watchLikeInvoices() {
    yield takeLatest(JJIM_LIKE_REQUEST, likeInvoice);
}

function* watchUnLikeInvoices() {
    yield takeLatest(JJIM_UNLIKE_REQUEST, unLikeInvoice);
}


export default function* invoiceSaga() {
    yield all([
        fork(watchInvoiceLikeGet),
        fork(watchLikeInvoices),
        fork(watchUnLikeInvoices),
        fork(watchInvoiceChartAdminGet),
        fork(watchInvoiceGet),
        fork(watchInvoiceRelatedGet),
        fork(watchInvoiceAdminGet),
        fork(watchInvoiceRead),
        fork(watchInvoiceAdd),
        fork(watchInvoiceDelete),
        fork(watchInvoiceUpdate),
        fork(watchInvoiceSearchGet),

    ]);
}