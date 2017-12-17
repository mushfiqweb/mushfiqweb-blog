import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

//all reducers
import userStoreReducer from './userReducer';
import articleReducer from './article.Reducer';
import postReducer from './post.Reducer';
import githubReducer from './github.Reducers';

const reducers = {
    userStore: userStoreReducer,
    articleStore: articleReducer,
    postStore: postReducer,
    githubStore: githubReducer,
    form: formReducer
}

const rootReducer = combineReducers({
    ...reducers
});

export default rootReducer;
