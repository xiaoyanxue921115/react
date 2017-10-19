import { handleActions } from 'redux-actions';
import Constants from '../constants/login'

export default handleActions({
        [Constants.LOGIN_SUCCEEDED](state, action) {
            return {...state, hasLogin: true}
        },
        [Constants.LOGIN_FAILED](state, action) {
            alert(action.message);
            return state;
        },
        [Constants.LOGOUT_SUCCEEDED](state, action) {
            return {...state, hasLogin: false}
        },
        [Constants.LOGOUT_FAILED](state, action) {
            alert(action.message);
            return state;
        }
    },
    {
        hasLogin: false
    }
)