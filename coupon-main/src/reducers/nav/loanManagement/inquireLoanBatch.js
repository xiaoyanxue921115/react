import { handleActions } from 'redux-actions';
import Constants from '../../../constants/inquireLoanBatch'

export default handleActions({
        [Constants.BATCH_DEPARTMENT_LIST_SUCCEEDED](state, action) {
            return {...state, departmentList: action.departmentList}
        },
        [Constants.BATCH_DEPARTMENT_LIST_FAILED](state, action) {
            alert(action.message);
            return state;
        },
        [Constants.BATCH_LEGION_LIST_SUCCEEDED](state, action) {
            return {...state, legionList: action.legionList}
        },
        [Constants.BATCH_LEGION_LIST_FAILED](state, action) {
            alert(action.message);
            return state;
        },
        [Constants.BATCH_LOANCHANNEL_LIST_SUCCEEDED](state, action) {
            return {...state, loanChannelList: action.loanChannelList}
        },
        [Constants.BATCH_LOANCHANNEL_LIST_FAILED](state, action) {
            alert(action.message);
            return state;
        },
        [Constants.BATCH_LOAN_LIST_SUCCEEDED](state, action) {
            return {...state, loanData: action.loanData};
        },
        [Constants.BATCH_LOAN_LIST_FAILED](state, action) {
            alert(action.message);
            return state;
        },
        [Constants.BATCH_CLEAN_TABLE](state, action) {
            let loanData = {
                                countPerPage:20,
                                pageIndex:1,
                                totalCount:0,
                                resultList:[]
                            }
            return {...state, loanData}
        },
    },
    {
        departmentList:[],
        legionList:[],
        loanChannelList:[],
        loanData:{
            countPerPage:20,
            pageIndex:1,
            totalCount:0,
            resultList:[]
        }
    }
)