import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AuthReducers from './reducers/authReducer';

export default createStore(
    combineReducers({
        AuthReducers
    }), {}, (applyMiddleware(thunk))
)