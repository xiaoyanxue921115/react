import { takeEvery, isCancelError } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import {getJSON} from '@sunl-fe/dataservice';
import Constants from '../constants/inquireLoanDetail'
import URLS from '../constants/URLS';

function* detailGetLoanList(action) {
    try {
        const data = yield call(getJSON, URLS.GET_COUPON_LIST, JSON.stringify({...action.inquireDetailParams}));
        yield put({type: Constants.DETAIL_LOAN_LIST_SUCCEEDED, loanDetailData:data });
        yield action.setMask(false);
   } catch (e) {
        yield put({type: Constants.DETAIL_LOAN_LIST_FAILED, message: e});
        yield action.setMask(false);
   }
}

function* detailGetLoanListSaga() {
    yield* takeEvery( Constants.DETAIL_LOAN_LIST_REQUESTED, detailGetLoanList );
}

function* detailGetDepartment(action) {
    try {
        const data = yield call(getJSON, URLS.GET_DEPARTMENT_LIST, {});
        yield put({type: Constants.DETAIL_DEPARTMENT_LIST_SUCCEEDED, departmentList:data.resultList });
   } catch (e) {
        yield put({type: Constants.DETAIL_DEPARTMENT_LIST_FAILED, message: e});
   }
}

function* detailGetDepartmentSaga() {
    yield* takeEvery( Constants.DETAIL_DEPARTMENT_LIST_REQUESTED, detailGetDepartment );
}

function* detailGetLegion(action) {
    try {
        const data = yield call(getJSON, URLS.GET_LEGION_LIST, JSON.stringify({departmentId: action.departmentId}));
        yield put({type: Constants.DETAIL_LEGION_LIST_SUCCEEDED, legionList:data.resultList });
   } catch (e) {
        yield put({type: Constants.DETAIL_LEGION_LIST_FAILED, message: e});
   }
}

function* detailGetLegionSaga() {
    yield* takeEvery( Constants.DETAIL_LEGION_LIST_REQUESTED, detailGetLegion );
}

function* detailGetLoanChannel(action) {
    try {
        const data = yield call(getJSON, URLS.GET_LOANCHANNEL_LIST, {});
        yield put({type: Constants.DETAIL_LOANCHANNEL_LIST_SUCCEEDED, loanChannelList:data.resultList });
   } catch (e) {
        yield put({type: Constants.DETAIL_LOANCHANNEL_LIST_FAILED, message: e});
   }
}

function* detailGetLoanChannelSaga() {
    yield* takeEvery( Constants.DETAIL_LOANCHANNEL_LIST_REQUESTED, detailGetLoanChannel );
}

export {
    detailGetLoanListSaga, detailGetDepartmentSaga, detailGetLegionSaga, detailGetLoanChannelSaga
};