import { handleActions } from 'redux-actions'
import Constants from '../../../constants/createLoan'
import { Modal } from 'antd'

export default handleActions({
        [Constants.CREATE_DEPARTMENT_LIST_SUCCEEDED](state, action) {
            return {...state, departmentList: action.departmentList}
        },
        [Constants.CREATE_DEPARTMENT_LIST_FAILED](state, action) {
            alert(action.message);
            return state;
        },
        [Constants.CREATE_LEGION_LIST_SUCCEEDED](state, action) {
            return {...state, legionList: action.legionList}
        },
        [Constants.CREATE_LEGION_LIST_FAILED](state, action) {
            alert(action.message);
            return state;
        },
        [Constants.CREATE_LOANCHANNEL_LIST_SUCCEEDED](state, action) {
            return {...state, loanChannelList: action.loanChannelList}
        },
        [Constants.CREATE_LOANCHANNEL_LIST_FAILED](state, action) {
            alert(action.message);
            return state;
        },
        [Constants.CREATE_LOAN_SUCCEEDED](state, action) {
            Modal.success({
                title: '新建贷款名额成功！'
            });
            action.onReset()
            return state;
        },
        [Constants.CREATE_LOAN_FAILED](state, action) {
            alert(action.message);
            return state;
        },
    },
    {
        departmentList:[],
        legionList:[],
        loanChannelList:[]
    }
)