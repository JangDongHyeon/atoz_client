import {

    FAQ_GET_REQUEST,
    FAQ_GET_SUCCESS,
    FAQ_GET_FAILURE,
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


    FAQ_REMOVE_UPDATE_IMAGE_REQUEST,
    FAQ_REMOVE_UPDATE_IMAGE_FAILURE,
    FAQ_REMOVE_UPDATE_IMAGE_SUCCESS,

    FAQ_UPLOAD_IMAGES_REQUEST,
    FAQ_UPLOAD_IMAGES_FAILURE,
    FAQ_UPLOAD_IMAGES_SUCCESS,

    FAQ_RELATED_REQUEST,
    FAQ_RELATED_FAILURE,
    FAQ_RELATED_SUCCESS,
    FAQ_REMOVE_IMAGE,
    FAQ_MOUSE_MOVE_REQUEST,

    FAQ_ADD_RESET,
    FAQ_NOT_GET_SUCCESS,
    FAQ_NOT_GET_FAILURE,
    FAQ_NOT_GET_REQUEST,
} from '../actions/types';
import { produce } from 'immer';


const initialState = {
    faqs: [],
    notFaqs: [],
    searchFaqs: [],
    relatedFaqs: [],
    imagePaths: [],
    hasMoreFaqs: true,
    psize: null,
    faq: null,
    loading: false,

    loadFaqsDone: false,
    loadFaqsLoading: false,
    loadFaqsError: null,

    imageRemoveFaqsDone: false,
    imageRemoveFaqsLoading: false,
    imageRemoveFaqsError: null,

    loadFaqsNotDone: false,
    loadFaqsNotLoading: false,
    loadFaqsNotError: null,

    searchFaqsDone: false,
    searchFaqsLoading: false,
    searchFaqsError: null,

    relatedFaqsDone: false,
    relatedFaqsLoading: false,
    relatedFaqsError: null,

    readFaqsError: null,
    readFaqsDone: false,
    readFaqsLoading: false,

    addFaqsDone: false,
    addFaqsLoading: false,
    addFaqsError: null,
    deleteFaqsDone: false,
    deleteFaqsLoading: false,
    deleteFaqsError: null,
    updateFaqsDone: false,
    updateFaqsLoading: false,
    updateFaqsError: null,
    uploadFaqImagesLoading: false,
    uploadFaqImagesDone: false,
    uploadFaqImagesError: null,
};

export const faqReducersInit = {
    type: FAQ_MOUSE_MOVE_REQUEST,
}


const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch (action.type) {
        case FAQ_GET_REQUEST:
            draft.loadFaqsLoading = true;
            draft.loadFaqsDone = false;
            draft.loadFaqsError = null;
            break;
        case FAQ_GET_SUCCESS:
            console.log(action.data.data)
            draft.loadFaqsLoading = false;
            draft.loadFaqsDone = true;
            draft.psize = action.data.data.size;
            draft.hasMoreFaqs = action.data.data.faqs.length === 10;

            if (action.data.check)
                draft.faqs = action.data.data.faqs
            else
                draft.faqs = draft.faqs.concat(action.data.data.faqs);
            break;
        case FAQ_REMOVE_IMAGE:
            draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
            break;
        case FAQ_GET_FAILURE:

            draft.loadFaqsLoading = false;
            draft.loadFaqsError = action.error;
            break;

        case FAQ_NOT_GET_REQUEST:
            draft.loadFaqsNotLoading = true;
            draft.loadFaqsNotDone = false;
            draft.loadFaqsNotError = null;
            break;
        case FAQ_NOT_GET_SUCCESS:

            draft.loadFaqsNotLoading = false;
            draft.loadFaqsNotDone = true;
            draft.psize = action.data.size;

            draft.notFaqs = draft.notFaqs.concat(action.data.faqs);
            break;
        case FAQ_NOT_GET_FAILURE:

            draft.loadFaqsNotLoading = false;
            draft.loadFaqsNotError = action.error;
            break;

        case FAQ_UPLOAD_IMAGES_REQUEST:
            draft.uploadFaqImagesLoading = true;
            draft.uploadFaqImagesDone = false;
            draft.uploadFaqImagesError = null;
            break;
        case FAQ_UPLOAD_IMAGES_SUCCESS:
            console.log(action.data)
            draft.imagePaths = draft.imagePaths.concat(action.data);
            draft.uploadFaqImagesLoading = false;
            draft.uploadFaqImagesDone = true;
            break;

        case FAQ_UPLOAD_IMAGES_FAILURE:
            draft.uploadFaqImagesLoading = false;
            draft.uploadFaqImagesError = action.error;
            break;
        case FAQ_SEARCH_REQUEST:
            draft.searchFaqsLoading = true;
            draft.searchFaqsDone = false;
            draft.searchFaqsError = null;
            break;
        case FAQ_SEARCH_SUCCESS:

            draft.searchFaqsLoading = false;
            draft.searchFaqsDone = true;
            draft.searchFaqs = draft.searchFaqs.concat(action.data.faqs);
            break;

        case FAQ_SEARCH_FAILURE:

            draft.searchFaqsLoading = false;
            draft.searchFaqsError = action.error;
            break;
        case FAQ_RELATED_REQUEST:
            draft.relatedFaqsLoading = true;
            draft.relatedFaqsDone = false;
            draft.relatedFaqsError = null;
            break;
        case FAQ_RELATED_SUCCESS:

            draft.relatedFaqsLoading = false;
            draft.relatedFaqsDone = true;
            draft.relatedFaqs = draft.relatedFaqs.concat(action.data.relatedFaqs);
            break;

        case FAQ_RELATED_FAILURE:

            draft.relatedFaqsLoading = false;
            draft.relatedFaqsError = action.error;
            break;


        case FAQ_READ_REQUEST:
            draft.readFaqsLoading = true;
            draft.readFaqsDone = false;
            draft.readFaqsError = null;
            break;
        case FAQ_READ_SUCCESS:

            draft.readFaqsLoading = false;
            draft.readFaqsDone = true;

            draft.imagePaths = action.data.faq.PImages;
            draft.faq = action.data.faq;
            break;

        case FAQ_READ_FAILURE:

            draft.readFaqsLoading = false;
            draft.faq = null
            draft.readFaqsError = action.error;
            break;
        case FAQ_REMOVE_UPDATE_IMAGE_REQUEST:
            draft.imageRemoveFaqsLoading = true;
            draft.imageRemoveFaqsDone = false;
            draft.imageRemoveFaqsError = null;
            break;
        case FAQ_REMOVE_UPDATE_IMAGE_SUCCESS:

            draft.imageRemoveFaqsLoading = false;
            draft.imageRemoveFaqsDone = true;

            break;

        case FAQ_REMOVE_UPDATE_IMAGE_FAILURE:

            draft.imageRemoveFaqsLoading = false;

            draft.imageRemoveFaqsError = action.error;
            break;
        case FAQ_ADD_RESET:
            draft.addFaqsDone = false;
            draft.addFaqsLoading = false;
            draft.updateFaqsDone = false;
            draft.updateFaqsLoading = false;
            draft.updateFaqsError = false;
            draft.imagePaths = []

        case FAQ_ADD_REQUEST:
            draft.addFaqsLoading = true;
            draft.addFaqsDone = false;
            draft.addFaqsError = null;
            break;
        case FAQ_ADD_SUCCESS:

            draft.addFaqsLoading = false;
            draft.addFaqsDone = true;
            draft.faq = action.data;

            break;

        case FAQ_ADD_FAILURE:

            draft.addFaqsLoading = false;
            draft.addFaqsError = action.error;
            break;
        case FAQ_UPDATE_REQUEST:
            draft.updateFaqsLoading = true;
            draft.updateFaqsDone = false;
            draft.updateFaqsError = null;
            break;
        case FAQ_UPDATE_SUCCESS:

            draft.updateFaqsLoading = false;
            draft.updateFaqsDone = true;

            break;

        case FAQ_UPDATE_FAILURE:

            draft.updateFaqsLoading = false;
            draft.updateFaqsError = action.error;
            break;

        case FAQ_DELETE_REQUEST:
            draft.deleteFaqsLoading = true;
            draft.deleteFaqsDone = false;
            draft.deleteFaqsError = null;
            break;
        case FAQ_DELETE_SUCCESS:

            draft.deleteFaqsLoading = false;
            draft.deleteFaqsDone = true;
            draft.faqs = draft.faqs.filter(item => parseInt(item.id, 10) !== parseInt(action.data.id, 10));
            break;

        case FAQ_DELETE_FAILURE:

            draft.deleteFaqsLoading = false;
            draft.deleteFaqsError = action.error;
            break;
        case FAQ_MOUSE_MOVE_REQUEST:
            draft.loadFaqsDone = false;
            draft.loadFaqsLoading = false;
            draft.loadFaqsError = null;
            draft.readFaqsError = null;
            draft.readFaqsDone = false;
            draft.readFaqsLoading = false;
            draft.addFaqsDone = false;
            draft.addFaqsLoading = false;
            draft.addFaqsError = null;
            draft.deleteFaqsDone = false;
            draft.deleteFaqsLoading = false;
            draft.deleteFaqsError = null;
            draft.updateFaqsDone = false;
            draft.updateFaqsLoading = false;
            draft.updateFaqsError = null
            break;
        default:
            break;
    }
});
export default reducer;