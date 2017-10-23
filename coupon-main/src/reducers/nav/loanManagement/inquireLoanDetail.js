import { handleActions } from 'redux-actions';
import Constants from '../../../constants/inquireLoanDetail'

export default handleActions({
        [Constants.DETAIL_DEPARTMENT_LIST_SUCCEEDED](state, action) {
            return {...state, departmentList: action.departmentList}
        },
        [Constants.DETAIL_DEPARTMENT_LIST_FAILED](state, action) {
            alert(action.message);
            return state;
        },
        [Constants.DETAIL_LEGION_LIST_SUCCEEDED](state, action) {
            return {...state, legionList: action.legionList}
        },
        [Constants.DETAIL_LEGION_LIST_FAILED](state, action) {
            alert(action.message);
            return state;
        },
        [Constants.DETAIL_LOANCHANNEL_LIST_SUCCEEDED](state, action) {
            return {...state, loanChannelList: action.loanChannelList}
        },
        [Constants.DETAIL_LOANCHANNEL_LIST_FAILED](state, action) {
            alert(action.message);
            return state;
        },
        [Constants.DETAIL_LOAN_LIST_SUCCEEDED](state, action) {
            return {...state, loanDetailData: action.loanDetailData};
        },
        [Constants.DETAIL_LOAN_LIST_FAILED](state, action) {
            alert(action.message);
            return state;
        },
        [Constants.DETAIL_CLEAN_TABLE](state, action) {
            let loanDetailData = {
                                    countPerPage:20,
                                    pageIndex:1,
                                    totalCount:0,
                                    maxCount:0,
                                    resultList:[],
                                }
            return {...state, loanDetailData}
        },
    },
    {
        departmentList:[],
        legionList:[],
        loanChannelList:[],
        loanDetailData:{
            countPerPage:20,
            pageIndex:1,
            totalCount:0,
            maxCount:0,
            resultList:[],
        }
    }
)