const defaultState = {
    category: { categoryTitle: '' },
    categories: [],
    loading: false,
    loadingMessage: ''
}

export default (state = defaultState, action = {}) => {
    switch (action.type) {

        case 'FETCH_Category_FULFILLED': {

            return {
                ...state,
                markdown: action.payload.data,
                loading: false
            }
        }

        default:
            return state;
    }
}
