
import { apiClientProd } from './';


export function newPost() {
    return dispatch => {
        dispatch({
            type: 'NEW_post'
        })
    }
}

/******* Fields Events *********/

export function titleOnChange(value) {
    return dispatch => {
        dispatch({
            type: 'titleOnChange',
            payload: value
        })
    }
}


export function metaTitleOnChange(value) {
    return dispatch => {
        dispatch({
            type: 'metaTitleOnChange',
            payload: value
        })
    }
}


export function metaDescOnChange(value) {
    return dispatch => {
        dispatch({
            type: 'metaDescOnChange',
            payload: value
        })
    }
}


export function metaImageOnChange(value) {
    return dispatch => {
        dispatch({
            type: 'metaImageOnChange',
            payload: value
        })
    }
}


export function metaUrlOnChange(value) {
    return dispatch => {
        dispatch({
            type: 'metaUrlOnChange',
            payload: value
        })
    }
}


export function articleUrlOnChange(value) {
    return dispatch => {
        dispatch({
            type: 'articleUrlOnChange',
            payload: value
        })
    }
}


export function articleSlugOnChange(value) {
    return dispatch => {
        dispatch({
            type: 'articleSlugOnChange',
            payload: value
        })
    }
}


export function articleCategoryOnChange(value) {
    return dispatch => {
        dispatch({
            type: 'articleCategoryOnChange',
            payload: value
        })
    }
}


export function articleBodyOnChange(value) {
    return dispatch => {
        dispatch({
            type: 'articleBodyOnChange',
            payload: value
        })
    }
}

/*
title
metaTitle
metaDesc
metaImage
metaUrl
articleUrl
articleSlug
articleCategory
articleBody
*/
export function fetchPost(_id) {
    return dispatch => {
        dispatch({
            type: 'FETCH_post',
            payload: apiClientProd.get('/api/article/' + _id)
        })
    }
}

export function savePost(article) {
    return dispatch => {
        dispatch({
            type: 'SAVE_post',
            payload: apiClientProd.post('/api/article', article)
        })
    }
}


export function updatePost(article) {
    let url = '/api/article';
    return dispatch => {
        dispatch({
            type: 'UPDATE_post',
            payload: apiClientProd.put(`${url}/${article._id}`, article)
        })
    }
}

