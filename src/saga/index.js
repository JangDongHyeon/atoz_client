// Imports: Dependencies
import { all, fork } from 'redux-saga/effects';

// Imports: Redux Sagas

import userSaga from './auth';
import postSaga from './post';
import faqSaga from './faq';
import qnaSaga from './qna';
import answerSaga from './answer';
import invoiceSaga from './invoice';
// import categorySaga from './category';

import axios from 'axios';
import { API } from '../config';
//http://155.230.24.116:8777/api
axios.defaults.baseURL = 'http://155.230.95.97:50001/api';
// axios.defaults.baseURL = 'https://pro.neoali.com:40008/api';
// axios.defaults.baseURL = `${API}`
// Redux Saga: Root Saga

export function* rootSaga() {
    yield all([
        fork(qnaSaga),
        fork(postSaga),
        fork(faqSaga),
        fork(userSaga),
        fork(answerSaga),
        fork(invoiceSaga)

    ]);
};