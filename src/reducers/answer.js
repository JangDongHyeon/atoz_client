import {

    ANSWER_GET_REQUEST,
    ANSWER_GET_SUCCESS,
    ANSWER_GET_FAILURE,
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


    ANSWER_REMOVE_UPDATE_IMAGE_REQUEST,
    ANSWER_REMOVE_UPDATE_IMAGE_FAILURE,
    ANSWER_REMOVE_UPDATE_IMAGE_SUCCESS,

    ANSWER_UPLOAD_IMAGES_REQUEST,
    ANSWER_UPLOAD_IMAGES_FAILURE,
    ANSWER_UPLOAD_IMAGES_SUCCESS,

    ANSWER_RELATED_REQUEST,
    ANSWER_RELATED_FAILURE,
    ANSWER_RELATED_SUCCESS,
    ANSWER_REMOVE_IMAGE,


    ANSWER_ADD_RESET,
    ANSWER_NOT_GET_SUCCESS,
    ANSWER_NOT_GET_FAILURE,
    ANSWER_NOT_GET_REQUEST,
} from '../actions/types';
import { produce } from 'immer';


const initialState = {
    answers: [],
    notAnswers: [],
    searchAnswers: [],
    relatedAnswers: [],
    imagePaths: [],
    hasMoreAnswers: true,
    psize: null,
    answer: null,
    loading: false,

    loadAnswersDone: false,
    loadAnswersLoading: false,
    loadAnswersError: null,

    imageRemoveAnswersDone: false,
    imageRemoveAnswersLoading: false,
    imageRemoveAnswersError: null,

    loadAnswersNotDone: false,
    loadAnswersNotLoading: false,
    loadAnswersNotError: null,

    searchAnswersDone: false,
    searchAnswersLoading: false,
    searchAnswersError: null,

    relatedAnswersDone: false,
    relatedAnswersLoading: false,
    relatedAnswersError: null,

    readAnswersError: null,
    readAnswersDone: false,
    readAnswersLoading: false,

    addAnswersDone: false,
    addAnswersLoading: false,
    addAnswersError: null,
    deleteAnswersDone: false,
    deleteAnswersLoading: false,
    deleteAnswersError: null,
    updateAnswersDone: false,
    updateAnswersLoading: false,
    updateAnswersError: null,
    uploadAnswerImagesLoading: false,
    uploadAnswerImagesDone: false,
    uploadAnswerImagesError: null,
};



const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch (action.type) {
        case ANSWER_GET_REQUEST:
            draft.loadAnswersLoading = true;
            draft.loadAnswersDone = false;
            draft.loadAnswersError = null;
            break;
        case ANSWER_GET_SUCCESS:

            draft.loadAnswersLoading = false;
            draft.loadAnswersDone = true;
            draft.psize = action.data.data.size;
            draft.hasMoreAnswers = action.data.data.answers.length === 10;

            if (action.data.check)
                draft.answers = action.data.data.answers
            else
                draft.answers = draft.answers.concat(action.data.data.answers);
            break;
        case ANSWER_REMOVE_IMAGE:
            draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
            break;
        case ANSWER_GET_FAILURE:

            draft.loadAnswersLoading = false;
            draft.loadAnswersError = action.error;
            break;

        case ANSWER_NOT_GET_REQUEST:
            draft.loadAnswersNotLoading = true;
            draft.loadAnswersNotDone = false;
            draft.loadAnswersNotError = null;
            break;
        case ANSWER_NOT_GET_SUCCESS:

            draft.loadAnswersNotLoading = false;
            draft.loadAnswersNotDone = true;
            draft.psize = action.data.size;

            draft.notAnswers = draft.notAnswers.concat(action.data.question);
            break;
        case ANSWER_NOT_GET_FAILURE:

            draft.loadAnswersNotLoading = false;
            draft.loadAnswersNotError = action.error;
            break;

        case ANSWER_UPLOAD_IMAGES_REQUEST:
            draft.uploadAnswerImagesLoading = true;
            draft.uploadAnswerImagesDone = false;
            draft.uploadAnswerImagesError = null;
            break;
        case ANSWER_UPLOAD_IMAGES_SUCCESS:
            console.log(action.data)
            draft.imagePaths = draft.imagePaths.concat(action.data);
            draft.uploadAnswerImagesLoading = false;
            draft.uploadAnswerImagesDone = true;
            break;

        case ANSWER_UPLOAD_IMAGES_FAILURE:
            draft.uploadAnswerImagesLoading = false;
            draft.uploadAnswerImagesError = action.error;
            break;
        case ANSWER_SEARCH_REQUEST:
            draft.searchAnswersLoading = true;
            draft.searchAnswersDone = false;
            draft.searchAnswersError = null;
            break;
        case ANSWER_SEARCH_SUCCESS:

            draft.searchAnswersLoading = false;
            draft.searchAnswersDone = true;
            draft.searchAnswers = draft.searchAnswers.concat(action.data.question);
            break;

        case ANSWER_SEARCH_FAILURE:

            draft.searchAnswersLoading = false;
            draft.searchAnswersError = action.error;
            break;
        case ANSWER_RELATED_REQUEST:
            draft.relatedAnswersLoading = true;
            draft.relatedAnswersDone = false;
            draft.relatedAnswersError = null;
            break;
        case ANSWER_RELATED_SUCCESS:

            draft.relatedAnswersLoading = false;
            draft.relatedAnswersDone = true;
            draft.relatedAnswers = draft.relatedAnswers.concat(action.data.relatedAnswers);
            break;

        case ANSWER_RELATED_FAILURE:

            draft.relatedAnswersLoading = false;
            draft.relatedAnswersError = action.error;
            break;


        case ANSWER_READ_REQUEST:
            draft.readAnswersLoading = true;
            draft.readAnswersDone = false;
            draft.readAnswersError = null;
            break;
        case ANSWER_READ_SUCCESS:

            draft.readAnswersLoading = false;
            draft.readAnswersDone = true;

            draft.imagePaths = action.data.question.QImages;
            draft.answer = action.data.question;
            break;

        case ANSWER_READ_FAILURE:

            draft.readAnswersLoading = false;
            draft.answer = null
            draft.readAnswersError = action.error;
            break;
        case ANSWER_REMOVE_UPDATE_IMAGE_REQUEST:
            draft.imageRemoveAnswersLoading = true;
            draft.imageRemoveAnswersDone = false;
            draft.imageRemoveAnswersError = null;
            break;
        case ANSWER_REMOVE_UPDATE_IMAGE_SUCCESS:

            draft.imageRemoveAnswersLoading = false;
            draft.imageRemoveAnswersDone = true;

            break;

        case ANSWER_REMOVE_UPDATE_IMAGE_FAILURE:

            draft.imageRemoveAnswersLoading = false;

            draft.imageRemoveAnswersError = action.error;
            break;
        case ANSWER_ADD_RESET:
            draft.addAnswersDone = false;
            draft.addAnswersLoading = false;
            draft.updateAnswersDone = false;
            draft.updateAnswersLoading = false;
            draft.updateAnswersError = false;
            draft.imagePaths = []

        case ANSWER_ADD_REQUEST:
            draft.addAnswersLoading = true;
            draft.addAnswersDone = false;
            draft.addAnswersError = null;
            break;
        case ANSWER_ADD_SUCCESS:

            draft.addAnswersLoading = false;
            draft.addAnswersDone = true;
            draft.answers = draft.answers.filter(item => item.id !== action.data.id);
            draft.answer = action.data;

            break;

        case ANSWER_ADD_FAILURE:

            draft.addAnswersLoading = false;
            draft.addAnswersError = action.error;
            break;
        case ANSWER_UPDATE_REQUEST:
            draft.updateAnswersLoading = true;
            draft.updateAnswersDone = false;
            draft.updateAnswersError = null;
            break;
        case ANSWER_UPDATE_SUCCESS:

            draft.updateAnswersLoading = false;
            draft.updateAnswersDone = true;

            break;

        case ANSWER_UPDATE_FAILURE:

            draft.updateAnswersLoading = false;
            draft.updateAnswersError = action.error;
            break;

        case ANSWER_DELETE_REQUEST:
            draft.deleteAnswersLoading = true;
            draft.deleteAnswersDone = false;
            draft.deleteAnswersError = null;
            break;
        case ANSWER_DELETE_SUCCESS:

            draft.deleteAnswersLoading = false;
            draft.deleteAnswersDone = true;
            console.log(action.data.questionId)
            if (action.data.questionId)
                draft.answers = draft.answers.filter(item => parseInt(item.id, 10) !== parseInt(action.data.questionId, 10));
            else {

                draft.answers = draft.answers.filter(item => parseInt(item.id, 10) !== parseInt(action.data.id, 10));

            }
            break;

        case ANSWER_DELETE_FAILURE:

            draft.deleteAnswersLoading = false;
            draft.deleteAnswersError = action.error;
            break;

        default:
            break;
    }
});
export default reducer;