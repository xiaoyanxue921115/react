import { takeEvery, isCancelError } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import {getJSON} from '@sunl-fe/dataservice';
import Constants from '../constants/inquireLoanBatch'
import URLS from '../constants/URLS';

function* batchGetLoanList(action) {
    try {
        const data = yield call(getJSON, URLS.GET_LOAN_LIST, JSON.stringify({...action.inquireBatchParams}));
        yield put({type: Constants.BATCH_LOAN_LIST_SUCCEEDED, loanData:data });
        yield action.setMask(false);
   } catch (e) {
        yield put({type: Constants.BATCH_LOAN_LIST_FAILED, message: e});
        yield action.setMask(false);
   }
}

function* batchGetLoanListSaga() {
    yield* takeEvery( Constants.BATCH_LOAN_LIST_REQUESTED, batchGetLoanList );
}

function* batchGetDepartment(action) {
    try {
        const data = yield call(getJSON, URLS.GET_DEPARTMENT_LIST, {});
        yield put({type: Constants.BATCH_DEPARTMENT_LIST_SUCCEEDED, departmentList:data.resultList });
   } catch (e) {
        yield put({type: Constants.BATCH_DEPARTMENT_LIST_FAILED, message: e});
   }
}

function* batchGetDepartmentSaga() {
    yield* takeEvery( Constants.BATCH_DEPARTMENT_LIST_REQUESTED, batchGetDepartment );
}

function* batchGetLegion(action) {
    try {
        const data = yield call(getJSON, URLS.GET_LEGION_LIST, JSON.stringify({departmentId: action.departmentId}));
        yield put({type: Constants.BATCH_LEGION_LIST_SUCCEEDED, legionList:data.resultList });
   } catch (e) {
        yield put({type: Constants.BATCH_LEGION_LIST_FAILED, message: e});
   }
}

function* batchGetLegionSaga() {
    yield* takeEvery( Constants.BATCH_LEGION_LIST_REQUESTED, batchGetLegion );
}

function* batchGetLoanChannel(action) {
    try {
        const data = yield call(getJSON, URLS.GET_LOANCHANNEL_LIST, {});
        yield put({type: Constants.BATCH_LOANCHANNEL_LIST_SUCCEEDED, loanChannelList:data.resultList });
   } catch (e) {
        yield put({type: Constants.BATCH_LOANCHANNEL_LIST_FAILED, message: e});
   }
}

function* batchGetLoanChannelSaga() {
    yield* takeEvery( Constants.BATCH_LOANCHANNEL_LIST_REQUESTED, batchGetLoanChannel );
}

export {
    batchGetLoanListSaga, batchGetDepartmentSaga, batchGetLegionSaga, batchGetLoanChannelSaga
};