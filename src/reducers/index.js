import {
    combineReducers
} from 'redux';

import user from './auth';
import post from './post';
import faq from './faq';
import qna from './qna';
import answer from './answer';
import invoice from './invoice';


export default combineReducers({
    user,
    post,
    faq,
    qna,
    answer,
    invoice
});