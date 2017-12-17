
const defaultState = {
    repositories: [],
    loading: false
}

export default (state = defaultState, action = {}) => {
    switch (action.type) {

        case 'FETCH_GithubTrends_PENDING': {
            return {
                ...state,
                loading: true
            }
        }

        case 'FETCH_GithubTrends_FULFILLED': {
            return {
                ...state,
                repositories: action.payload.data.repoList,
                loading: false
            }
        }

        default:
            return state;
    }
}
