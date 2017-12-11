import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

//all reducers
import userStoreReducer from './userReducer';
import articleReducer from './article.Reducer';
import postReducer from './post.Reducer';

const reducers = {
    userStore: userStoreReducer,
    articleStore: articleReducer,
    postStore: postReducer,
    form: formReducer
}

const rootReducer = combineReducers({
    ...reducers
});

export default rootReducer;
