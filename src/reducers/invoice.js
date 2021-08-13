import {

    INVOICE_GET_REQUEST,
    INVOICE_GET_SUCCESS,
    INVOICE_GET_FAILURE,

    INVOICE_LIKE_GET_REQUEST,
    INVOICE_LIKE_GET_SUCCESS,
    INVOICE_LIKE_GET_FAILURE,

    INVOICE_ADMIN_GET_REQUEST,
    INVOICE_ADMIN_GET_SUCCESS,
    INVOICE_ADMIN_GET_FAILURE,
    INVOICE_CHART_ADMIN_GET_REQUEST,
    INVOICE_CHART_ADMIN_GET_SUCCESS,
    INVOICE_CHART_ADMIN_GET_FAILURE,


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
    JJIM_LIKE_REQUEST,
    JJIM_LIKE_FAILURE,
    JJIM_LIKE_SUCCESS,
    JJIM_UNLIKE_REQUEST,
    JJIM_UNLIKE_FAILURE,
    JJIM_UNLIKE_SUCCESS,


    INVOICE_RELATED_REQUEST,
    INVOICE_RELATED_FAILURE,
    INVOICE_RELATED_SUCCESS,


    INVOICE_RESET,
    INVOICE_ADD_RESET,

} from '../actions/types';
import { produce } from 'immer';


const initialState = {
    invoices: [],
    likeInvoices: [],
    notInvoices: [],
    searchInvoices: [],
    relatedInvoices: [],
    imagePaths: [],
    chartC: [],
    chartT: [],
    hasMoreInvoices: true,
    psize: null,
    invoice: null,

    loadAdminInvoicesDone: false,
    loadAdminInvoicesLoading: false,
    loadAdminInvoicesError: null,

    loadAdminInvoicesChatsDone: false,
    loadAdminInvoicesChatsLoading: false,
    loadAdminInvoicesChatsError: null,

    loadInvoicesDone: false,
    loadInvoicesLoading: false,
    loadInvoicesError: null,

    loadInvoicesLikeDone: false,
    loadInvoicesLikeLoading: false,
    loadInvoicesLikeError: null,

    imageRemoveInvoicesDone: false,
    imageRemoveInvoicesLoading: false,
    imageRemoveInvoicesError: null,

    loadInvoicesNotDone: false,
    loadInvoicesNotLoading: false,
    loadInvoicesNotError: null,

    searchInvoicesDone: false,
    searchInvoicesLoading: false,
    searchInvoicesError: null,

    relatedInvoicesDone: false,
    relatedInvoicesLoading: false,
    relatedInvoicesError: null,

    readInvoicesError: null,
    readInvoicesDone: false,
    readInvoicesLoading: false,

    addInvoicesDone: false,
    addInvoicesLoading: false,
    addInvoicesError: null,
    deleteInvoicesDone: false,
    deleteInvoicesLoading: false,
    deleteInvoicesError: null,
    updateInvoicesDone: false,
    updateInvoicesLoading: false,
    updateInvoicesError: null,
    uploadInvoiceImagesLoading: false,
    uploadInvoiceImagesDone: false,
    uploadInvoiceImagesError: null,
    jjimLikeDone: false,
    jjimLikeLoading: false,
    jjimLikeError: null,
    jjimUnLikeDone: false,
    jjimUnLikeLoading: false,
    jjimUnLikeError: null,
};



const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch (action.type) {
        case INVOICE_GET_REQUEST:
            draft.loadInvoicesLoading = true;
            draft.loadInvoicesDone = false;
            draft.loadInvoicesError = null;
            break;
        case INVOICE_GET_SUCCESS:
            console.log(action.data.data)
            draft.loadInvoicesLoading = false;
            draft.loadInvoicesDone = true;
            draft.psize = action.data.data.size;
            draft.hasMoreInvoices = action.data.data.invoices.length === 10;

            if (action.data.check)
                draft.invoices = action.data.data.invoices
            else
                draft.invoices = draft.invoices.concat(action.data.data.invoices);
            break;

        case INVOICE_GET_FAILURE:

            draft.loadInvoicesLoading = false;
            draft.loadInvoicesError = action.error;
            break;

        case INVOICE_LIKE_GET_REQUEST:
            draft.loadInvoicesLikeLoading = true;
            draft.loadInvoicesLikeDone = false;
            draft.loadInvoicesLikeError = null;
            break;
        case INVOICE_LIKE_GET_SUCCESS:

            draft.loadInvoicesLikeLoading = false;
            draft.loadInvoicesLikeDone = true;
            draft.psize = action.data.data.size;
            draft.hasMoreInvoices = action.data.data.length === 10;

            if (action.data.check)
                draft.likeInvoices = action.data.data
            else
                draft.likeInvoices = draft.likeInvoices.concat(action.data.data);
            break;

        case INVOICE_LIKE_GET_FAILURE:

            draft.loadInvoicesLikeLoading = false;
            draft.loadInvoicesLikeError = action.error;
            break;

        case INVOICE_ADMIN_GET_REQUEST:
            draft.loadAdminInvoicesLoading = true;
            draft.loadAdminInvoicesDone = false;
            draft.loadAdminInvoicesError = null;
            break;
        case INVOICE_ADMIN_GET_SUCCESS:

            draft.loadAdminInvoicesLoading = false;
            draft.loadAdminInvoicesDone = true;
            draft.psize = action.data.data.size;
            draft.hasMoreInvoices = action.data.data.invoices.length === 10;

            if (action.data.check)
                draft.invoices = action.data.data.invoices
            else
                draft.invoices = draft.invoices.concat(action.data.data.invoices);
            break;

        case INVOICE_ADMIN_GET_FAILURE:

            draft.loadAdminInvoicesLoading = false;
            draft.loadAdminInvoicesError = action.error;
            break;


        case INVOICE_CHART_ADMIN_GET_REQUEST:
            draft.loadAdminInvoicesChatsLoading = true;
            draft.loadAdminInvoicesChatsDone = false;
            draft.loadAdminInvoicesChatsError = null;
            break;
        case INVOICE_CHART_ADMIN_GET_SUCCESS:

            draft.loadAdminInvoicesChatsLoading = false;
            draft.loadAdminInvoicesChatsDone = true;


            draft.chartC = action.data.data.arrC;
            draft.chartT = action.data.data.arrT;

            draft.invoices = action.data;
            break;

        case INVOICE_CHART_ADMIN_GET_FAILURE:

            draft.loadAdminInvoicesChatsLoading = false;
            draft.loadAdminInvoicesChatsError = action.error;
            break;



        case INVOICE_RESET:
            draft.searchInvoicesLoading = false;
            draft.searchInvoicesDone = false;
            draft.searchInvoicesError = null;
            draft.imagePaths = []
            break;

        case INVOICE_SEARCH_REQUEST:
            draft.searchInvoicesLoading = true;
            draft.searchInvoicesDone = false;
            draft.searchInvoicesError = null;
            break;
        case INVOICE_SEARCH_SUCCESS:

            draft.searchInvoicesLoading = false;
            draft.searchInvoicesDone = true;
            draft.searchInvoice = action.data.invoice;
            break;

        case INVOICE_SEARCH_FAILURE:

            draft.searchInvoicesLoading = false;
            draft.searchInvoicesError = action.error;
            break;
        case INVOICE_RELATED_REQUEST:
            draft.relatedInvoicesLoading = true;
            draft.relatedInvoicesDone = false;
            draft.relatedInvoicesError = null;
            break;
        case INVOICE_RELATED_SUCCESS:

            draft.relatedInvoicesLoading = false;
            draft.relatedInvoicesDone = true;
            draft.relatedInvoices = draft.relatedInvoices.concat(action.data.relatedInvoices);
            break;

        case INVOICE_RELATED_FAILURE:

            draft.relatedInvoicesLoading = false;
            draft.relatedInvoicesError = action.error;
            break;


        case INVOICE_READ_REQUEST:
            draft.readInvoicesLoading = true;
            draft.readInvoicesDone = false;
            draft.readInvoicesError = null;
            break;
        case INVOICE_READ_SUCCESS:

            draft.readInvoicesLoading = false;
            draft.readInvoicesDone = true;

            // draft.imagePaths = action.data.invoice.PImages;
            draft.invoice = action.data.invoice;
            break;

        case INVOICE_READ_FAILURE:

            draft.readInvoicesLoading = false;
            draft.invoice = null
            draft.readInvoicesError = action.error;
            break;




        case INVOICE_ADD_RESET:
            draft.addInvoicesDone = false;
            draft.addInvoicesLoading = false;
            draft.updateInvoicesDone = false;
            draft.updateInvoicesLoading = false;
            draft.updateInvoicesError = false;
            draft.imagePaths = []

        case INVOICE_ADD_REQUEST:
            draft.addInvoicesLoading = true;
            draft.addInvoicesDone = false;
            draft.addInvoicesError = null;
            break;
        case INVOICE_ADD_SUCCESS:

            draft.addInvoicesLoading = false;
            draft.addInvoicesDone = true;
            draft.invoice = action.data;

            break;

        case INVOICE_ADD_FAILURE:

            draft.addInvoicesLoading = false;
            draft.addInvoicesError = action.error;
            break;
        case INVOICE_UPDATE_REQUEST:
            draft.updateInvoicesLoading = true;
            draft.updateInvoicesDone = false;
            draft.updateInvoicesError = null;
            break;
        case INVOICE_UPDATE_SUCCESS:

            draft.updateInvoicesLoading = false;
            draft.updateInvoicesDone = true;

            break;

        case INVOICE_UPDATE_FAILURE:

            draft.updateInvoicesLoading = false;
            draft.updateInvoicesError = action.error;
            break;

        case INVOICE_DELETE_REQUEST:
            draft.deleteInvoicesLoading = true;
            draft.deleteInvoicesDone = false;
            draft.deleteInvoicesError = null;
            break;
        case INVOICE_DELETE_SUCCESS:

            draft.deleteInvoicesLoading = false;
            draft.deleteInvoicesDone = true;
            draft.invoices = draft.invoices.filter(item => parseInt(item.id, 10) !== parseInt(action.data.id, 10));
            break;

        case INVOICE_DELETE_FAILURE:

            draft.deleteInvoicesLoading = false;
            draft.deleteInvoicesError = action.error;
            break;
        case JJIM_LIKE_REQUEST:
            draft.jjimLikeLoading = true;
            draft.jjimLikeDone = false;
            draft.jjimLikeError = null;
            break;
        case JJIM_LIKE_SUCCESS:

            draft.jjimLikeLoading = false;
            draft.jjimLikeDone = true;
            // if(check==='jjimList')
            //     draft.likeInvoices=draft.likeInvoices.concat({})
            // else
            draft.invoice.Likers = draft.invoice.Likers.concat({ id: action.data.userId });
            break;
        case JJIM_LIKE_FAILURE:
            draft.jjimLikeLoading = false;
            draft.jjimLikeError = action.error;

            break;
        case JJIM_UNLIKE_REQUEST:
            draft.jjimUnLikeLoading = true;
            draft.jjimUnLikeDone = false;
            draft.jjimUnLikeError = null;
            break;
        case JJIM_UNLIKE_SUCCESS:

            draft.jjimUnLikeLoading = false;
            draft.jjimUnLikeDone = true;
            if (action.data.check === 'jjimList')
                draft.likeInvoices = draft.likeInvoices.filter(item => item.id !== action.data.invoiceId)
            else
                draft.invoice.Likers = draft.invoice.Likers.filter(item => item.id !== action.data.userId);
            break;
        case JJIM_UNLIKE_FAILURE:
            draft.jjimUnLikeLoading = false;
            draft.jjimUnLikeError = action.error;

        default:
            break;
    }
});
export default reducer;