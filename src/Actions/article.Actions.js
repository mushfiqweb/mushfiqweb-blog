
import { scraperClientProd, apiClientProd } from './';

import axios from 'axios';
export function getAccentColor(page) {
    return dispatch => {
        dispatch({
            type: 'GET_ACCENT',
            payload: page
        })
    }
}

export function fetchInstaPhotos() {
    const instagramClient = axios.create({
        baseURL: 'https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"432531619","first":30,"after":null}',
        headers: {
            "Content-Type": "application/json"
        }
    });
    return dispatch => {
        dispatch({
            type: 'FETCH_INSTA',
            payload: instagramClient.get()
        })
    }
}

export function onEditorChange(textValue) {
    return dispatch => {
        dispatch({
            type: 'SET_TEXT',
            payload: textValue
        })
    }
}

export function fetchMarkdown() {
    return dispatch => {
        dispatch({
            type: 'FETCH_Markdown',
            payload: scraperClientProd.get('/api/getmarkdown')
        })
    }
}

export function fetchReactSEO() {
    return dispatch => {
        dispatch({
            type: 'FETCH_ReactSEO',
            payload: scraperClientProd.get('/api/getreactseo')
        })
    }
}

export function emptyArticle() {
    return dispatch => {
        dispatch({
            type: 'emptyArticle'
        })
    }
}

export function initFetch() {
    return dispatch => {
        dispatch({
            type: 'initFetch'
        })
    }
}

export function newMarkdown() {
    return dispatch => {
        dispatch({
            type: 'NEW_Markdown'
        })
    }
}

export function newArticle() {
    return dispatch => {
        dispatch({
            type: 'NEW_Article'
        })
    }
}

export function fetchFakeArticles() {
    return dispatch => {
        dispatch({
            type: 'FETCH_FakeArticles',
            payload: apiClientProd.get('/api/article')
        })
    }
}

export function fetchArticles(limit, skip) {
    return dispatch => {
        dispatch({
            type: 'FETCH_Articles',
            payload: apiClientProd.get('/api/article?$limit=' + limit + '&$skip=' + skip + '&$sort[createdAt]=-1&isDeleted=false')
        })
    }
}

export function fetchArticle(url) {
    return dispatch => {
        dispatch({
            type: 'FETCH_Article',
            payload: apiClientProd.get('/api/article?articleUrl=' + url)
        })
    }
}

export function saveArticle(article) {
    var url = article.title.replaceAll(',', '');
    url = url.replaceAll('.', '');
    url = url.replace(/\s+/g, '-').toLowerCase();
    var articleJSON = {
        articleTotalViews: 1,
        articleTotalComments: 0,
        articleRatingHigh: 0,
        articleRatingLow: 0,
        articleRatingAvg: 0,
        articleTag: '',
        articleWriter: '',
        articleBody: article.articleBody,
        articlePostedDate: new Date().getDate(),
        articleCategory: article.articleCategory,
        articleUrl: url,
        articleTitle: article.title,
        metaTitle: article.metaTitle,
        metaDesc: article.metaDesc,
        metaImage: article.metaImage,
        metaUrl: article.metaUrl,
        articleSlug: article.articleSlug,
        metaKeys: article.metaKeys,
        introImage: article.introImage,
        serialNumber: '',
        city: article.city,
        country_code: article.country_code,
        country_name: article.country_name,
        ip: article.ip,
        latitude: article.latitude,
        longitude: article.longitude,
        zip_code: article.zip_code
    }
    return dispatch => {
        dispatch({
            type: 'SAVE_Article',
            payload: apiClientProd.post('/api/article', articleJSON)
        })
    }
}


export function updateArticle(article) {
    let url = '/api/article';
    return dispatch => {
        dispatch({
            type: 'UPDATE_Article',
            payload: apiClientProd.put(`${url}/${article._id}`, article)
        })
    }
}

String.prototype.replaceAll = function (search, replace) {
    //if replace is not sent, return original string otherwise it will
    //replace search string with 'undefined'.
    if (replace === undefined) {
        return this.toString();
    }

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
};