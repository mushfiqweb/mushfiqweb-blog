
import { apiClientProd } from './';


export function fetchCategories() {
    return dispatch => {
        dispatch({
            type: 'FETCH_Categories',
            payload: apiClientProd.get('/api/articleCategory')
        })
    }
}
