import { scraperClientProd } from './';

export function fetchGithubTrends(type) {

    if (type === 'repo') {

    }

    return dispatch => {
        dispatch({
            type: 'FETCH_GithubTrends',
            payload: scraperClientProd.get('/api/githubtrends')
        })
    }
}