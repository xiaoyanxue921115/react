import { combineReducers } from 'redux';
import createLoan from './nav/loanManagement/createLoan';
import inquireLoanBatch from './nav/loanManagement/inquireLoanBatch';
import inquireLoanDetail from './nav/loanManagement/inquireLoanDetail';

export default combineReducers({
    createLoan,
    inquireLoanBatch,
    inquireLoanDetail
})