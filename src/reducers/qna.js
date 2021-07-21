import {

    QNA_GET_REQUEST,
    QNA_GET_SUCCESS,
    QNA_GET_FAILURE,
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


    QNA_REMOVE_UPDATE_IMAGE_REQUEST,
    QNA_REMOVE_UPDATE_IMAGE_FAILURE,
    QNA_REMOVE_UPDATE_IMAGE_SUCCESS,

    QNA_UPLOAD_IMAGES_REQUEST,
    QNA_UPLOAD_IMAGES_FAILURE,
    QNA_UPLOAD_IMAGES_SUCCESS,

    QNA_RELATED_REQUEST,
    QNA_RELATED_FAILURE,
    QNA_RELATED_SUCCESS,
    QNA_REMOVE_IMAGE,


    QNA_ADD_RESET,
    QNA_NOT_GET_SUCCESS,
    QNA_NOT_GET_FAILURE,
    QNA_NOT_GET_REQUEST,
} from '../actions/types';
import { produce } from 'immer';


const initialState = {
    qnas: [],
    notQnas: [],
    searchQnas: [],
    relatedQnas: [],
    imagePaths: [],
    hasMoreQnas: true,
    psize: null,
    qna: null,
    loading: false,

    loadQnasDone: false,
    loadQnasLoading: false,
    loadQnasError: null,

    imageRemoveQnasDone: false,
    imageRemoveQnasLoading: false,
    imageRemoveQnasError: null,

    loadQnasNotDone: false,
    loadQnasNotLoading: false,
    loadQnasNotError: null,

    searchQnasDone: false,
    searchQnasLoading: false,
    searchQnasError: null,

    relatedQnasDone: false,
    relatedQnasLoading: false,
    relatedQnasError: null,

    readQnasError: null,
    readQnasDone: false,
    readQnasLoading: false,

    addQnasDone: false,
    addQnasLoading: false,
    addQnasError: null,
    deleteQnasDone: false,
    deleteQnasLoading: false,
    deleteQnasError: null,
    updateQnasDone: false,
    updateQnasLoading: false,
    updateQnasError: null,
    uploadQnaImagesLoading: false,
    uploadQnaImagesDone: false,
    uploadQnaImagesError: null,
};



const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch (action.type) {
        case QNA_GET_REQUEST:
            draft.loadQnasLoading = true;
            draft.loadQnasDone = false;
            draft.loadQnasError = null;
            break;
        case QNA_GET_SUCCESS:

            draft.loadQnasLoading = false;
            draft.loadQnasDone = true;
            draft.psize = action.data.data.size;
            draft.hasMoreQnas = action.data.data.questions.length === 10;

            if (action.data.check)
                draft.qnas = action.data.data.questions
            else
                draft.qnas = draft.qnas.concat(action.data.data.questions);
            break;
        case QNA_REMOVE_IMAGE:
            draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
            break;
        case QNA_GET_FAILURE:

            draft.loadQnasLoading = false;
            draft.loadQnasError = action.error;
            break;

        case QNA_NOT_GET_REQUEST:
            draft.loadQnasNotLoading = true;
            draft.loadQnasNotDone = false;
            draft.loadQnasNotError = null;
            break;
        case QNA_NOT_GET_SUCCESS:

            draft.loadQnasNotLoading = false;
            draft.loadQnasNotDone = true;
            draft.psize = action.data.size;

            draft.notQnas = draft.notQnas.concat(action.data.question);
            break;
        case QNA_NOT_GET_FAILURE:

            draft.loadQnasNotLoading = false;
            draft.loadQnasNotError = action.error;
            break;

        case QNA_UPLOAD_IMAGES_REQUEST:
            draft.uploadQnaImagesLoading = true;
            draft.uploadQnaImagesDone = false;
            draft.uploadQnaImagesError = null;
            break;
        case QNA_UPLOAD_IMAGES_SUCCESS:
            console.log(action.data)
            draft.imagePaths = draft.imagePaths.concat(action.data);
            draft.uploadQnaImagesLoading = false;
            draft.uploadQnaImagesDone = true;
            break;

        case QNA_UPLOAD_IMAGES_FAILURE:
            draft.uploadQnaImagesLoading = false;
            draft.uploadQnaImagesError = action.error;
            break;
        case QNA_SEARCH_REQUEST:
            draft.searchQnasLoading = true;
            draft.searchQnasDone = false;
            draft.searchQnasError = null;
            break;
        case QNA_SEARCH_SUCCESS:

            draft.searchQnasLoading = false;
            draft.searchQnasDone = true;
            draft.searchQnas = draft.searchQnas.concat(action.data.question);
            break;

        case QNA_SEARCH_FAILURE:

            draft.searchQnasLoading = false;
            draft.searchQnasError = action.error;
            break;
        case QNA_RELATED_REQUEST:
            draft.relatedQnasLoading = true;
            draft.relatedQnasDone = false;
            draft.relatedQnasError = null;
            break;
        case QNA_RELATED_SUCCESS:

            draft.relatedQnasLoading = false;
            draft.relatedQnasDone = true;
            draft.relatedQnas = draft.relatedQnas.concat(action.data.relatedQnas);
            break;

        case QNA_RELATED_FAILURE:

            draft.relatedQnasLoading = false;
            draft.relatedQnasError = action.error;
            break;


        case QNA_READ_REQUEST:
            draft.readQnasLoading = true;
            draft.readQnasDone = false;
            draft.readQnasError = null;
            break;
        case QNA_READ_SUCCESS:

            draft.readQnasLoading = false;
            draft.readQnasDone = true;

            draft.imagePaths = action.data.question.QImages;
            draft.qna = action.data.question;
            break;

        case QNA_READ_FAILURE:

            draft.readQnasLoading = false;
            draft.qna = null
            draft.readQnasError = action.error;
            break;
        case QNA_REMOVE_UPDATE_IMAGE_REQUEST:
            draft.imageRemoveQnasLoading = true;
            draft.imageRemoveQnasDone = false;
            draft.imageRemoveQnasError = null;
            break;
        case QNA_REMOVE_UPDATE_IMAGE_SUCCESS:

            draft.imageRemoveQnasLoading = false;
            draft.imageRemoveQnasDone = true;

            break;

        case QNA_REMOVE_UPDATE_IMAGE_FAILURE:

            draft.imageRemoveQnasLoading = false;

            draft.imageRemoveQnasError = action.error;
            break;
        case QNA_ADD_RESET:
            draft.addQnasDone = false;
            draft.addQnasLoading = false;
            draft.updateQnasDone = false;
            draft.updateQnasLoading = false;
            draft.updateQnasError = false;
            draft.imagePaths = []
        case QNA_ADD_REQUEST:
            draft.addQnasLoading = true;
            draft.addQnasDone = false;
            draft.addQnasError = null;
            break;
        case QNA_ADD_SUCCESS:

            draft.addQnasLoading = false;
            draft.addQnasDone = true;
            draft.qna = action.data;

            break;

        case QNA_ADD_FAILURE:

            draft.addQnasLoading = false;
            draft.addQnasError = action.error;
            break;
        case QNA_UPDATE_REQUEST:
            draft.updateQnasLoading = true;
            draft.updateQnasDone = false;
            draft.updateQnasError = null;
            break;
        case QNA_UPDATE_SUCCESS:

            draft.updateQnasLoading = false;
            draft.updateQnasDone = true;

            break;

        case QNA_UPDATE_FAILURE:

            draft.updateQnasLoading = false;
            draft.updateQnasError = action.error;
            break;

        case QNA_DELETE_REQUEST:
            draft.deleteQnasLoading = true;
            draft.deleteQnasDone = false;
            draft.deleteQnasError = null;
            break;
        case QNA_DELETE_SUCCESS:

            draft.deleteQnasLoading = false;
            draft.deleteQnasDone = true;
            draft.qnas = draft.qnas.filter(item => parseInt(item.id, 10) !== parseInt(action.data.id, 10));
            break;

        case QNA_DELETE_FAILURE:

            draft.deleteQnasLoading = false;
            draft.deleteQnasError = action.error;
            break;

        default:
            break;
    }
});
export default reducer;