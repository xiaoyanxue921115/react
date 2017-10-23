import { takeEvery, isCancelError } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import {getJSON} from '@sunl-fe/dataservice';
import Constants from '../constants/createLoan'
import URLS from '../constants/URLS';

function* createGetDepartment(action) {
    try {
        const data = yield call(getJSON, URLS.GET_DEPARTMENT_LIST, {});
        yield put({type: Constants.CREATE_DEPARTMENT_LIST_SUCCEEDED, departmentList:data.resultList });
   } catch (e) {
        yield put({type: Constants.CREATE_DEPARTMENT_LIST_FAILED, message: e});
   }
}

function* createGetDepartmentSaga() {
    yield* takeEvery( Constants.CREATE_DEPARTMENT_LIST_REQUESTED, createGetDepartment );
}

function* createGetLegion(action) {
    try {
        const data = yield call(getJSON, URLS.GET_LEGION_LIST, JSON.stringify({departmentId: action.departmentId}));
        yield put({type: Constants.CREATE_LEGION_LIST_SUCCEEDED, legionList:data.resultList });
   } catch (e) {
        yield put({type: Constants.CREATE_LEGION_LIST_FAILED, message: e});
   }
}

function* createGetLegionSaga() {
    yield* takeEvery( Constants.CREATE_LEGION_LIST_REQUESTED, createGetLegion );
}

function* createGetLoanChannel(action) {
    try {
        const data = yield call(getJSON, URLS.GET_LOANCHANNEL_LIST, {});
        yield put({type: Constants.CREATE_LOANCHANNEL_LIST_SUCCEEDED, loanChannelList:data.resultList });
   } catch (e) {
        yield put({type: Constants.CREATE_LOANCHANNEL_LIST_FAILED, message: e});
   }
}

function* createGetLoanChannelSaga() {
    yield* takeEvery( Constants.CREATE_LOANCHANNEL_LIST_REQUESTED, createGetLoanChannel );
}

function* createLoan(action) {
    try {
        const data = yield call(getJSON, URLS.CREATE_LOAN, JSON.stringify({...action.addLoanParams}));
        yield put({type: Constants.CREATE_LOAN_SUCCEEDED, onReset:action.onReset});
        yield action.setMask(false);
   } catch (e) {
        yield put({type: Constants.CREATE_LOAN_FAILED, message: e});
        yield action.setMask(false);
   }
}

function* createLoanSaga() {
    yield* takeEvery( Constants.CREATE_LOAN_REQUESTED, createLoan );
}

export {
    createGetDepartmentSaga, createGetLegionSaga, createGetLoanChannelSaga, createLoanSaga
};