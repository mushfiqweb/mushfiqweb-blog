import { getRandomColor } from '../Utils/utilFunctions';

const defaultState = {
    nextPost: {
        postTitle: '',
        postUrl: ''
    },
    prevPost: {
        postTitle: '',
        postUrl: ''
    },
    InstaPhotos: [],
    serialNumberArray: [],
    AppAccentColor: 'teal',
    editorText: '',
    article: '',
    skip: 0,
    total: -1,
    post: {
        articleTitle: '',
        articlePostedDate: '',
        articleUpdatedDate: '',
        articleWriter: '',
        articleCategory: '',
        articleTag: '',
        articleBody: '',
        articleSlug: '',
        articleTotalViews: '',
        articleUrl: '',
        articleTotalComments: '',
        articleRatingHigh: '',
        articleRatingLow: '',
        articleRatingAvg: '',
        metaUrl: '',
        metaTitle: '',
        metaImage: '',
        metaDesc: '',
        metaKeys: ''

    },
    articles: [],
    markdown: '# Initiated!',
    loading: false,
    loadingMessage: ''
}

export default (state = defaultState, action = {}) => {
    switch (action.type) {

        /*
        UPDATE_Student_PENDING
        UPDATE_Student_FULFILLED
        UPDATE_Student_REJECTED
        SAVE_Student_REJECTED
        SAVE_Student_PENDING
        SAVE_Student_FULFILLED
        FETCH_Student_PENDING
        FETCH_Student_REJECTED
        FETCH_Student_FULFILLED
        */


        case 'FETCH_INSTA_FULFILLED': {
            var tempArr = [];
            for (var idx in action.payload.data.data.user.edge_owner_to_timeline_media.edges) {
                console.log(idx);
                var photoItem = {
                    caption: action.payload.data.data.user.edge_owner_to_timeline_media.edges[idx].node.edge_media_to_caption.edges.length > 0 ? action.payload.data.data.user.edge_owner_to_timeline_media.edges[idx].node.edge_media_to_caption.edges[0].node.text : '',
                    imgSource: action.payload.data.data.user.edge_owner_to_timeline_media.edges[idx].node.display_url,
                    instagramUrl: 'https://www.instagram.com/p/' + action.payload.data.data.user.edge_owner_to_timeline_media.edges[idx].node.shortcode,
                    totalComments: action.payload.data.data.user.edge_owner_to_timeline_media.edges[idx].node.edge_media_to_comment.count,
                    totalLikes: action.payload.data.data.user.edge_owner_to_timeline_media.edges[idx].node.edge_media_preview_like.count,
                    isVideo: action.payload.data.data.user.edge_owner_to_timeline_media.edges[idx].node.is_video,
                    totalViews: action.payload.data.data.user.edge_owner_to_timeline_media.edges[idx].node.edge_media_preview_like.count,
                    taken_at_timestamp: action.payload.data.data.user.edge_owner_to_timeline_media.edges[idx].node.taken_at_timestamp
                }

                tempArr.push(photoItem);
            }
            return {
                ...state,
                loading: false,
                InstaPhotos: tempArr
            }
        }


        case 'GET_ACCENT': {
            console.log(action.payload);
            console.log(getRandomColor(action.payload));
            return {
                ...state,
                AppAccentColor: getRandomColor(action.payload)
            }
        }

        case 'emptyArticle': {
            return {
                ...state,
                loading: false,
                article: ''
            }
        }

        case 'NEW_POST': {
            return {
                ...state
            }
        }
        case 'SAVE_post_pending': {
            return {
                ...state
            }
        }
        case 'FETCH_post_pending': {
            return {
                ...state
            }
        }

        case 'SET_TEXT': {
            return {
                ...state,
                editorText: action.payload
            }
        }


        case 'NEW_Markdown': {
            return {
                ...state,
                loading: true
            }
        }

        case 'FETCH_Markdown_PENDING': {

            return {
                ...state,
                loading: true
            }
        }

        case 'initFetch': {
            return {
                ...state,
                loading: true
            }
        }

        case 'FETCH_Markdown_FULFILLED': {

            return {
                ...state,
                markdown: action.payload.data.markdown,
                loading: false
            }
        }


        case 'FETCH_SerialNumber': {

            return {
                ...state,
                serialNumberArray: action.payload.data,
                loading: false
            }
        }

        case 'FETCH_Article_PENDING': {

            return {
                ...state,
                loading: true
            }
        }


        case 'FETCH_SerialNumber_PENDING': {

            return {
                ...state,
                loading: true
            }
        }

        case 'FETCH_Article_FULFILLED': {


            var tempArticle = {
                articleTitle: 'No Article found',
                articleBody: 'No Article Found'
            };

            if (action.payload.data.data) {
                if (action.payload.data.data.length > 0) {
                    tempArticle = action.payload.data.data[0];
                }
            }

            return {
                ...state,
                article: tempArticle,
                loading: false
            }
        }



        case 'FETCH_Articles_PENDING': {

            return {
                ...state,
                loading: true
            }
        }

        case 'FETCH_Articles_FULFILLED': {
            var tempArticles = state.articles;
            if (action.payload.data.data.length > 0) {
                tempArticles = tempArticles.concat(action.payload.data.data);
            }
            return {
                ...state,
                articles: tempArticles,
                loading: false,
                skip: action.payload.data.skip,
                total: action.payload.data.total,
            }
        }


        case 'FETCH_ReactSEO_PENDING': {

            return {
                ...state,
                loading: true
            }
        }

        case 'FETCH_ReactSEO_FULFILLED': {
            return {
                ...state,
                markdown: action.payload.data.markdown,
                loading: false
            }
        }


        case 'NEW_Article': {
            return {
                ...state,
                loading: true,
                article: '',
                loadingMessage: 'Started posting...'
            }
        }

        case 'SAVE_Article_PENDING': {

            return {
                ...state,
                loading: true,
                loadingMessage: 'Posting article...'
            }
        }

        case 'SAVE_Article_FULFILLED': {

            return {
                ...state,
                article: action.payload.datatempArticle,
                loading: false
            }
        }

        default:
            return state;
    }
}
