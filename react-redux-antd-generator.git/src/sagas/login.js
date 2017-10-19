import { takeEvery, isCancelError } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import {getJSON} from '@sunl-fe/dataservice';
import Constants from '../constants/login'
import URLS from '../constants/URLS';
import { hashHistory } from 'react-router';

function* login(action) {
    try {
        const data = yield call(getJSON, URLS.LOGIN, {password: action.password, accountName: action.accountName});
        yield put({type: Constants.LOGIN_SUCCEEDED, accountInfo:data });
        yield hashHistory.push('/project');
   } catch (e) {
      yield put({type: Constants.LOGIN_FAILED, message: e});
   }
}

function* loginSaga() {
    yield* takeEvery( Constants.LOGIN_REQUESTED, login );
}

function* logout(action) {
    try {
        const data = yield call(getJSON, URLS.LOGOUT, {});
        yield put({type: Constants.LOGOUT_SUCCEEDED, logoutData:data });
        yield hashHistory.push('/login');
   } catch (e) {
      yield put({type: Constants.LOGOUT_FAILED, message: e});
   }
}

function* logoutSaga() {
    yield* takeEvery( Constants.LOGOUT_REQUESTED, logout );
}
export {
    loginSaga, logoutSaga
};