import React from 'react'
import style from './style.less'
import t_style from '../../../../styles/less/com_blend.less'
import c_style from '../../../../styles/less/common.less'
import classnames from 'classnames'
import { Radio, DatePicker, Button, Select, Input, Pagination } from 'antd'
import moment from 'moment'
import Constants from '../../../../constants/inquireLoanBatch'
import URLS from '../../../../constants/URLS'
import { hashHistory } from 'react-router';
import {getJSON} from '@sunl-fe/dataservice';
import Loading from '../../../common/loading/Spin'

const emptyDataImg = require('../../../../images/empty_data.png')

const dateFormat = 'YYYY/MM/DD'

class InquireLoanBatch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loanCode: '',
            creatorId: '',
            departmentId: '-1',
            legionId: '-1',
            loanChannelCode: '-1',
            validityStart: null,
            validityEnd: null,
            pageIndex: 1,
            legionList: [],
            isInquiring: false
        }
    }
    componentDidMount(){
        const { dispatch } = this.props
        dispatch({type:Constants.BATCH_DEPARTMENT_LIST_REQUESTED})
        dispatch({type:Constants.BATCH_LOANCHANNEL_LIST_REQUESTED})
        dispatch({type:Constants.BATCH_CLEAN_TABLE})
        this.setState({legionList:[]})
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.legionList != this.props.legionList){
            this.setState({legionList: nextProps.legionList})
        }
    }
    onDepartmentChange = (value) => {
        const { dispatch } = this.props
        this.setState({departmentId: value, legionId: '-1', legionList: []},
            ()=>{
                value != '-1' && dispatch({type:Constants.BATCH_LEGION_LIST_REQUESTED, departmentId: value})
            }
        )
    }
    onLegionChange = (value) => {
        this.setState({legionId: value})
    }
    onChannelChange = (value) => {
        this.setState({
            loanChannelCode: value,
        });
    }
    onCreatorChange = (e) => {
        this.setState({
            creatorId: e.target.value,
        });
    }
    disabledEndDate = (validityEnd) => {
        const validityStart = this.state.validityStart
        if (!validityStart) {
            return validityEnd
        }
        return validityEnd && validityEnd.valueOf() < validityStart.valueOf()
    }
    onLoanCodeChange = (e) => {
        this.setState({
            loanCode: e.target.value,
        });
    }
    onDateChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }
    onStartChange = (value) => {
        const validityEnd = this.state.validityEnd
        if(validityEnd && value && (validityEnd.valueOf() < value.valueOf()))
        {
            this.onDateChange('validityEnd', null)
        }
        this.onDateChange('validityStart', value)
    }
    onEndChange = (value) => {
        const validityStart = this.state.validityStart
        if(validityStart && value.valueOf() < validityStart.valueOf()){
            this.onDateChange('validityStart', null)
            systemWarn('结束时间需大于开始时间！')
        }
        this.onDateChange('validityEnd', value)
    }
    onSearch = () => {
        const { dispatch } = this.props
        const { loanCode, creatorId, loanChannelCode, validityStart, validityEnd, departmentId, legionId, pageIndex } = this.state
        // if(!loanCode && (!validityStart || !validityEnd)){
        //     systemWarn('贷款名额批次和有效期至少选填其一！')
        //     return
        // }
        this.setMask(true)
        dispatch({
            type:Constants.BATCH_LOAN_LIST_REQUESTED, setMask:this.setMask,
            inquireBatchParams: {loanCode, creatorId, loanChannelCode: loanChannelCode!= '-1' ? loanChannelCode : '' ,
                validityStart: validityStart ? validityStart.format('YYYY-MM-DD') : '', validityEnd: validityEnd ? validityEnd.format('YYYY-MM-DD') : '',
                departmentId: departmentId!= '-1' ? departmentId : '' , legionId: legionId!= '-1' ? legionId : '' , pageIndex}
        })
    }
    setMask = (bool) => {
        this.setState({isInquiring:bool})
    }
    onReset = () => {
        this.setState({
            loanCode: '',
            creatorId: '',
            departmentId: '-1',
            legionId: '-1',
            loanChannelCode: '-1',
            validityStart: null,
            validityEnd: null,
            pageIndex: 1,
            legionList: []
        })
    }
    goCreate = () => {
        hashHistory.push('/loanQuota/nav/loanManagement/createLoan')
    }
    onPageChange = (page, pageSize) => {
        this.setState({pageIndex: page},
            ()=>this.onSearch()
        )
    }
    onFirstSearch = () => {
        this.setState({pageIndex: 1},
            ()=>this.onSearch()
        )
    }
    renderDepartOptions = (departmentList) => {
        let departmentOptions = departmentList.map((department, index) => {
            return (<Select.Option key={index} value={department.departmentId.toString()} >{department.departmentName}</Select.Option>)
        })
        return departmentOptions
    }
    renderLegionOptions = (legionList) => {
        let legionOptions = legionList.map((legion, index) => {
            return (<Select.Option key={index} value={legion.legionId.toString()} >{legion.legionName}</Select.Option>)
        })
        return legionOptions
    }
    renderRadioOptions = (loanChannelList) => {
        let loanRadioOptions = loanChannelList.map((radio, index) => {
            return (<Select.Option key={index} value={radio.loanChannelCode.toString()} >{radio.loanChannelName}</Select.Option>)
        })
        return loanRadioOptions
    }
    renderLoanTable = (loanData) => {
        let loanTable = loanData.map((loan, index) => {
            return (
                    <tr key={index} >
                        <td><div>{loan.loanCode}</div></td>
                        <td><div>{loan.loanChannelName}</div></td>
                        <td><div>{loan.loanCount}</div></td>
                        <td><div>{moment(loan.validityStart).format('YYYY.MM.DD')}-{moment(loan.validityEnd).format('YYYY.MM.DD')}</div></td>
                        <td><div>{loan.departmentName}</div></td>
                        <td><div>{loan.legionName}</div></td>
                        <td><div>{loan.creatorName}</div></td>
                        <td><div>{moment(loan.createTime).format('YYYY.MM.DD')}</div></td>
                        <td><div className={style['button-operate']} onClick={()=>this.downloadLoan(loan.loanCode)} >导出</div></td>
                    </tr>
                )
        })
        return loanTable
    }
    downloadLoan = (loanCode) => {
        // getJSON(URLS.DOWNLOAD_LOAN, JSON.stringify({loanCode}));
        // window.location.href = URLS.DOWNLOAD_LOAN + '?loanCode=' + loanCode
        window.open(URLS.DOWNLOAD_LOAN + '?loanCode=' + loanCode)
    }
    render() {
        const {departmentId, legionId, legionList, validityStart, validityEnd, loanChannelCode, loanCode, creatorId, pageIndex, isInquiring} = this.state
        const {departmentList, loanChannelList, loanData, role} = this.props
        return (
            <div className={style['secondLevel']}>
                <div className={t_style['navi']} >
                    <span className={t_style['nav--title']} >贷款名额批次查询</span>
                </div>
                <div className={style['secondLevel__info']} style={{width:'calc(100% - 40px)', maxHeight: 'calc(100% - 80px)'}}>
                    <div className={style['secondLevel__info--basic']} >
                        <div className={style['secondLevel__info-title']} >
                            <div className={style['secondLevel__info-divider']} ></div>
                            <span>查询批次</span>
                        </div>
                        <div className={style['secondLevel__info--commodity']} >
                            <div className={style['secondLevel__info--item-b']} >
                                <div className={style['secondLevel__info-quarterPercent']} >
                                    <span className={classnames(style['secondLevel__info--basic-text'], style['secondLevel__info-halfPercent'])} style={{width:'50%'}} >贷款名额批次：</span>
                                    <Input style={{width:'50%'}} value={loanCode} onChange={this.onLoanCodeChange} type="text"/>
                                </div>
                                <div className={style['secondLevel__info-quarterPercent']} >
                                    <span className={classnames(style['secondLevel__info--basic-text'], style['secondLevel__info-halfPercent'])} style={{width:'40%'}} >货款渠道：</span>
                                    <Select value={loanChannelCode} onChange={this.onChannelChange} placeholder='请选择贷款渠道' className={style['secondLevel__info-halfPercent']} >
                                        <Select.Option key='-1' value='-1' >请选择贷款渠道</Select.Option>
                                        {this.renderRadioOptions(loanChannelList)}
                                    </Select>
                                </div>
                                <div className={style['secondLevel__info-halfPercent']} >
                                    <span className={classnames(style['secondLevel__info--basic-text'], style['secondLevel__info-halfPercent'])} style={{width:'20%'}} >所属军团：</span>
                                    <Select value={departmentId} onChange={this.onDepartmentChange} style={{width: '38%', marginRight:'2%'}} placeholder='请选择事业部' className={style['secondLevel__info-halfPercent']} >
                                        <Select.Option key='-1' value='-1' >请选择事业部</Select.Option>
                                        {this.renderDepartOptions(departmentList)}
                                    </Select>
                                    <Select value={legionId} onChange={this.onLegionChange} style={{width: '38%'}} placeholder='请选择军团' className={style['secondLevel__info-halfPercent']} >
                                        <Select.Option key='-1' value='-1' >请选择军团</Select.Option>
                                        {this.renderLegionOptions(legionList)}
                                    </Select>
                                </div>
                            </div>
                            <div className={style['secondLevel__info--item-b']} >
                                <div className={style['secondLevel__info-quarterPercent']} >
                                    <span className={classnames(style['secondLevel__info--basic-text'], style['secondLevel__info-halfPercent'])} style={{width:'50%'}} >操作人：</span>
                                    <Input style={{width:'50%'}} value={creatorId} onChange={this.onCreatorChange} type="text"/>
                                </div>
                                <div className={style['secondLevel__info-halfPercent']} >
                                    <span className={classnames(style['secondLevel__info--basic-text'], style['secondLevel__info-halfPercent'])} style={{width:'20%'}} >有效期：</span>
                                    <DatePicker format={dateFormat} value={validityStart} onChange={this.onStartChange} onOpenChange={this.handleStartOpenChange} disabledDate={this.disabledStartDate} />
                                    <span className={style['secondLevel__info--basic-text']} >&nbsp;&nbsp;至&nbsp;&nbsp;</span>
                                    <DatePicker format={dateFormat} value={validityEnd} onChange={this.onEndChange} onOpenChange={this.handleEndOpenChange} disabledDate={this.disabledEndDate} />
                                </div>
                                <div className={style['secondLevel__info-quarterPercent']} >
                                    <Button onClick={this.onReset} className={classnames( c_style['mr20'])} style={{width:60}}>重置</Button>
                                    <Button onClick={this.onFirstSearch} type="primary" className={classnames(style['secondLevel__info-halfPercent'], style['button-choose'])} style={{width:60}}>搜索</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classnames(style['secondLevel__info--basic'])} >
                        { role == 'SOP' && <p className={c_style['h35']} ><Button type="primary" size='large' onClick={this.goCreate} className={classnames(c_style['fr'], style['button-choose'])} style={{width:180}}>新建贷款名额批次</Button></p>}
                        {loanData.resultList.length > 0 ?
                        <table className={classnames(t_style['table'], c_style['mt20'], c_style['mb20']) } >
                            <thead>
                                <tr>
                                    <th style={{width:'10%'}} >贷款名额批次</th>
                                    <th style={{width:'10%'}} >贷款渠道</th>
                                    <th style={{width:'10%'}} >数量</th>
                                    <th style={{width:'15%'}} >有效期</th>
                                    <th style={{width:'10%'}} >所属事业部</th>
                                    <th style={{width:'10%'}} >所属军团</th>
                                    <th style={{width:'10%'}} >操作人</th>
                                    <th style={{width:'15%'}} >操作时间</th>
                                    <th style={{width:'10%'}} >操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderLoanTable(loanData.resultList)}
                            </tbody>
                        </table>
                        :
                        <div className={classnames(c_style['mb30'], t_style['text-center'])} >
                            <img  src={emptyDataImg}/>
                            <p className={classnames(c_style['mt10'], c_style['f24'], c_style['graybc'])} >暂无数据</p>
                        </div> }
                        {loanData.resultList.length > 0 ? <Pagination className={classnames(c_style['mb30'], c_style['fr'], 'pagination__color')} showQuickJumper pageSize={loanData.countPerPage} current={pageIndex} total={loanData.totalCount} onChange={this.onPageChange}/> : null}
                    </div>
                </div>
                {isInquiring ? <Loading/> : null}
            </div>
        )
    }
}

export default InquireLoanBatch;