
const defaultState = {
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
    loading: false,
    status: ''
}

export default (state = defaultState, action = {}) => {
    switch (action.type) {


        default:
            return state;
    }
}
