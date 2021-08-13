import {

    POST_GET_REQUEST,
    POST_GET_SUCCESS,
    POST_GET_FAILURE,
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


    POST_REMOVE_UPDATE_IMAGE_REQUEST,
    POST_REMOVE_UPDATE_IMAGE_FAILURE,
    POST_REMOVE_UPDATE_IMAGE_SUCCESS,

    POST_UPLOAD_IMAGES_REQUEST,
    POST_UPLOAD_IMAGES_FAILURE,
    POST_UPLOAD_IMAGES_SUCCESS,

    POST_RELATED_REQUEST,
    POST_RELATED_FAILURE,
    POST_RELATED_SUCCESS,
    POST_REMOVE_IMAGE,
    POST_MOUSE_MOVE_REQUEST,

    POST_ADD_RESET,
    POST_NOT_GET_SUCCESS,
    POST_NOT_GET_FAILURE,
    POST_NOT_GET_REQUEST,
} from '../actions/types';
import { produce } from 'immer';


const initialState = {
    posts: [],
    notPosts: [],
    searchPosts: [],
    relatedPosts: [],
    imagePaths: [],
    hasMorePosts: true,
    psize: null,
    post: null,
    loading: false,

    loadPostsDone: false,
    loadPostsLoading: false,
    loadPostsError: null,

    imageRemovePostsDone: false,
    imageRemovePostsLoading: false,
    imageRemovePostsError: null,

    loadPostsNotDone: false,
    loadPostsNotLoading: false,
    loadPostsNotError: null,

    searchPostsDone: false,
    searchPostsLoading: false,
    searchPostsError: null,

    relatedPostsDone: false,
    relatedPostsLoading: false,
    relatedPostsError: null,

    readPostsError: null,
    readPostsDone: false,
    readPostsLoading: false,

    addPostsDone: false,
    addPostsLoading: false,
    addPostsError: null,
    deletePostsDone: false,
    deletePostsLoading: false,
    deletePostsError: null,
    updatePostsDone: false,
    updatePostsLoading: false,
    updatePostsError: null,
    uploadPostImagesLoading: false,
    uploadPostImagesDone: false,
    uploadPostImagesError: null,
};

export const postReducersInit = {
    type: POST_MOUSE_MOVE_REQUEST,
}


const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch (action.type) {
        case POST_GET_REQUEST:
            draft.loadPostsLoading = true;
            draft.loadPostsDone = false;
            draft.loadPostsError = null;
            break;
        case POST_GET_SUCCESS:
            console.log(action.data.data)
            draft.loadPostsLoading = false;
            draft.loadPostsDone = true;
            draft.psize = action.data.data.size;
            draft.hasMorePosts = action.data.data.posts.length === 10;

            if (action.data.check)
                draft.posts = action.data.data.posts
            else
                draft.posts = draft.posts.concat(action.data.data.posts);
            break;
        case POST_REMOVE_IMAGE:
            draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
            break;
        case POST_GET_FAILURE:

            draft.loadPostsLoading = false;
            draft.loadPostsError = action.error;
            break;

        case POST_NOT_GET_REQUEST:
            draft.loadPostsNotLoading = true;
            draft.loadPostsNotDone = false;
            draft.loadPostsNotError = null;
            break;
        case POST_NOT_GET_SUCCESS:

            draft.loadPostsNotLoading = false;
            draft.loadPostsNotDone = true;
            draft.psize = action.data.size;

            draft.notPosts = draft.notPosts.concat(action.data.posts);
            break;
        case POST_NOT_GET_FAILURE:

            draft.loadPostsNotLoading = false;
            draft.loadPostsNotError = action.error;
            break;

        case POST_UPLOAD_IMAGES_REQUEST:
            draft.uploadPostImagesLoading = true;
            draft.uploadPostImagesDone = false;
            draft.uploadPostImagesError = null;
            break;
        case POST_UPLOAD_IMAGES_SUCCESS:
            console.log(action.data)
            draft.imagePaths = draft.imagePaths.concat(action.data);
            draft.uploadPostImagesLoading = false;
            draft.uploadPostImagesDone = true;
            break;

        case POST_UPLOAD_IMAGES_FAILURE:
            draft.uploadPostImagesLoading = false;
            draft.uploadPostImagesError = action.error;
            break;
        case POST_SEARCH_REQUEST:
            draft.searchPostsLoading = true;
            draft.searchPostsDone = false;
            draft.searchPostsError = null;
            break;
        case POST_SEARCH_SUCCESS:

            draft.searchPostsLoading = false;
            draft.searchPostsDone = true;
            draft.searchPosts = draft.searchPosts.concat(action.data.posts);
            break;

        case POST_SEARCH_FAILURE:

            draft.searchPostsLoading = false;
            draft.searchPostsError = action.error;
            break;
        case POST_RELATED_REQUEST:
            draft.relatedPostsLoading = true;
            draft.relatedPostsDone = false;
            draft.relatedPostsError = null;
            break;
        case POST_RELATED_SUCCESS:

            draft.relatedPostsLoading = false;
            draft.relatedPostsDone = true;
            draft.relatedPosts = draft.relatedPosts.concat(action.data.relatedPosts);
            break;

        case POST_RELATED_FAILURE:

            draft.relatedPostsLoading = false;
            draft.relatedPostsError = action.error;
            break;


        case POST_READ_REQUEST:
            draft.readPostsLoading = true;
            draft.readPostsDone = false;
            draft.readPostsError = null;
            break;
        case POST_READ_SUCCESS:

            draft.readPostsLoading = false;
            draft.readPostsDone = true;
       
            draft.imagePaths = action.data.post.PImages;
            draft.post = action.data.post;
            break;

        case POST_READ_FAILURE:

            draft.readPostsLoading = false;
            draft.post = null
            draft.readPostsError = action.error;
            break;
        case POST_REMOVE_UPDATE_IMAGE_REQUEST:
            draft.imageRemovePostsLoading = true;
            draft.imageRemovePostsDone = false;
            draft.imageRemovePostsError = null;
            break;
        case POST_REMOVE_UPDATE_IMAGE_SUCCESS:

            draft.imageRemovePostsLoading = false;
            draft.imageRemovePostsDone = true;

            break;

        case POST_REMOVE_UPDATE_IMAGE_FAILURE:

            draft.imageRemovePostsLoading = false;

            draft.imageRemovePostsError = action.error;
            break;
        case POST_ADD_RESET:
            draft.addPostsDone = false;
            draft.addPostsLoading = false;
            draft.updatePostsDone = false;
            draft.updatePostsLoading = false;
            draft.updatePostsError = false;
            draft.imagePaths = []
        case POST_ADD_REQUEST:
            draft.addPostsLoading = true;
            draft.addPostsDone = false;
            draft.addPostsError = null;
            break;
        case POST_ADD_SUCCESS:

            draft.addPostsLoading = false;
            draft.addPostsDone = true;
            draft.post = action.data;

            break;

        case POST_ADD_FAILURE:

            draft.addPostsLoading = false;
            draft.addPostsError = action.error;
            break;
        case POST_UPDATE_REQUEST:
            draft.updatePostsLoading = true;
            draft.updatePostsDone = false;
            draft.updatePostsError = null;
            break;
        case POST_UPDATE_SUCCESS:

            draft.updatePostsLoading = false;
            draft.updatePostsDone = true;

            break;

        case POST_UPDATE_FAILURE:

            draft.updatePostsLoading = false;
            draft.updatePostsError = action.error;
            break;

        case POST_DELETE_REQUEST:
            draft.deletePostsLoading = true;
            draft.deletePostsDone = false;
            draft.deletePostsError = null;
            break;
        case POST_DELETE_SUCCESS:

            draft.deletePostsLoading = false;
            draft.deletePostsDone = true;
            draft.posts = draft.posts.filter(item => parseInt(item.id, 10) !== parseInt(action.data.id, 10));
            break;

        case POST_DELETE_FAILURE:

            draft.deletePostsLoading = false;
            draft.deletePostsError = action.error;
            break;
        case POST_MOUSE_MOVE_REQUEST:
            draft.loadPostsDone = false;
            draft.loadPostsLoading = false;
            draft.loadPostsError = null;
            draft.readPostsError = null;
            draft.readPostsDone = false;
            draft.readPostsLoading = false;
            draft.addPostsDone = false;
            draft.addPostsLoading = false;
            draft.addPostsError = null;
            draft.deletePostsDone = false;
            draft.deletePostsLoading = false;
            draft.deletePostsError = null;
            draft.updatePostsDone = false;
            draft.updatePostsLoading = false;
            draft.updatePostsError = null
            break;
        default:
            break;
    }
});
export default reducer;