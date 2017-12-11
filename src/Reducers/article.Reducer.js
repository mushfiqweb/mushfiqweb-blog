
const defaultState = {
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

        case 'FETCH_Markdown_FULFILLED': {

            return {
                ...state,
                markdown: action.payload.data.markdown,
                loading: false
            }
        }



        case 'FETCH_Article_PENDING': {

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
