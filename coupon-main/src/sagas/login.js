import { takeEvery, isCancelError } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import {getJSON} from '@sunl-fe/dataservice';
import Constants from '../constants/login'
import URLS from '../constants/URLS';
import { hashHistory } from 'react-router';

function* login(action) {
    try {
        const data = yield call(getJSON, URLS.LOGIN, {password: action.password, username: action.username});
        yield put({type: Constants.LOGIN_SUCCEEDED, userInfo:data.userInfo });
        if(data.role == 'SOP'){
            hashHistory.push('/loanQuota/nav/loanManagement/createLoan');
        }
        else if(data.role == 'CONSULTANT'){
            hashHistory.push('/loanQuota/nav/loanManagement/inquireLoanBatch');
        }
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

function* getCurrentUser(action) {
    try {
        const data = yield call(getJSON, URLS.GET_CURRENT_USER, {});
        yield put({type: Constants.GET_CURRENT_USER_SUCCEEDED, userInfo:data.userInfo, role: data.role });
   } catch (e) {
      yield put({type: Constants.GET_CURRENT_USER_FAILED, message: e});
   }
}

function* getCurrentUserSaga() {
    yield* takeEvery( Constants.GET_CURRENT_USER_REQUESTED, getCurrentUser );
}

export {
    loginSaga, logoutSaga, getCurrentUserSaga
};