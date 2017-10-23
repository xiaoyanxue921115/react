import React from 'react'
import style from './style.less'
import t_style from '../../../../styles/less/com_blend.less'
import c_style from '../../../../styles/less/common.less'
import classnames from 'classnames'
import { Radio, DatePicker, Button, Select, Input, Pagination } from 'antd'
import moment from 'moment'
import Constants from '../../../../constants/inquireLoanDetail'
import URLS from '../../../../constants/URLS'
import { hashHistory } from 'react-router';
import {getJSON} from '@sunl-fe/dataservice';
import Loading from '../../../common/loading/Spin'

const emptyDataImg = require('../../../../images/empty_data.png')

const dateFormat = 'YYYY/MM/DD'

const statusMap = {
    LOAN_COUPON_STATUS_ACTIVE: '未使用',
    LOAN_COUPON_STATUS_LOCKED: '锁定',
    LOAN_COUPON_STATUS_USED: '已使用',
    LOAN_COUPON_STATUS_EXPIRED: '已过期'
    }

class InquireLoanDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loanCode: '',
            loanCouponCode: '',
            departmentId: '-1',
            legionId: '-1',
            loanChannelCode: '-1',
            validityStart: null,
            validityEnd: null,
            pageIndex: 1,
            legionList: [],
            couponStatus: '-1',
            isInquiring: false
        }
    }
    componentDidMount(){
        const { dispatch } = this.props
        dispatch({type:Constants.DETAIL_DEPARTMENT_LIST_REQUESTED})
        dispatch({type:Constants.DETAIL_LOANCHANNEL_LIST_REQUESTED})
        dispatch({type:Constants.DETAIL_CLEAN_TABLE})
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
                value != '-1' && dispatch({type:Constants.DETAIL_LEGION_LIST_REQUESTED, departmentId: value})
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
    onStatusChange = (value) => {
        this.setState({
            couponStatus: value,
        });
    }
    onCouponCodeChange = (e) => {
        this.setState({
            loanCouponCode: e.target.value,
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
        const { loanCode, loanCouponCode, loanChannelCode, validityStart, validityEnd, departmentId, legionId, pageIndex, couponStatus } = this.state
        // if(!loanCode && (!validityStart || !validityEnd) && !loanCouponCode){
        //     systemWarn('贷款名额批次、编号和有效期至少选填其一！')
        //     return
        // }
        this.setMask(true)
        dispatch({
            type:Constants.DETAIL_LOAN_LIST_REQUESTED, setMask:this.setMask,
            inquireDetailParams: {loanCode, loanCouponCode, loanChannelCode: loanChannelCode!= '-1' ? loanChannelCode : '' ,
                validityStart: validityStart ? validityStart.format('YYYY-MM-DD') : '', validityEnd: validityEnd ? validityEnd.format('YYYY-MM-DD') : '',
                couponStatus: couponStatus!= '-1' ? couponStatus : '',
                departmentId: departmentId!= '-1' ? departmentId : '' , legionId: legionId!= '-1' ? legionId : '' , pageIndex}
        })
    }
    setMask = (bool) => {
        this.setState({isInquiring:bool})
    }
    onReset = () => {
        this.setState({
            loanCode: '',
            loanCouponCode: '',
            departmentId: '-1',
            legionId: '-1',
            loanChannelCode: '-1',
            validityStart: null,
            validityEnd: null,
            pageIndex: 1,
            legionList: [],
            couponStatus: '-1'
        })
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
    renderLoanTable = (loanDetailData) => {
        let loanTable = loanDetailData.map((loan, index) => {
            return (
                    <tr key={index} >
                        <td><div>{loan.loanCouponCode}</div></td>
                        <td><div>{loan.loanChannelName}</div></td>
                        <td><div>{moment(loan.validityStart).format('YYYY.MM.DD')}-{moment(loan.validityEnd).format('YYYY.MM.DD')}</div></td>
                        <td><div>{loan.departmentName}</div></td>
                        <td><div>{loan.legionName}</div></td>
                        <td><div>{statusMap[loan.couponStatus]}</div></td>
                        <td><div>{loan.orderNumber}</div></td>
                    </tr>
                )
        })
        return loanTable
    }
    assembleParams = (params) => Object.keys(params).map(key => `${key}=${params[key]}`).join('&')

    downloadLoan = () => {
        const {loanDetailData} = this.props
        if(loanDetailData && loanDetailData.totalCount && loanDetailData.totalCount > loanDetailData.maxCount){
            systemWarn(`导出数据数量超过${loanDetailData.maxCount}条，请重新搜索再导出！`)
            return
        }
        const {departmentId, legionId, validityStart, validityEnd, loanChannelCode, loanCode, loanCouponCode, couponStatus} = this.state
        let downloadParams = {
            departmentId: departmentId!= '-1' ? departmentId : '' , legionId: legionId!= '-1' ? legionId : '' ,
            validityStart: validityStart ? validityStart.format('YYYY-MM-DD') : '', validityEnd: validityEnd ? validityEnd.format('YYYY-MM-DD') : '', loanChannelCode: loanChannelCode!= '-1' ? loanChannelCode : '', loanCode,
            loanCouponCode, couponStatus: couponStatus!= '-1' ? couponStatus : ''
        }
        getJSON(URLS.DOWNLOAD_LOAN_BY_SEARCH_VALID, JSON.stringify({...downloadParams}))
        .then(()=>{
            window.open(URLS.DOWNLOAD_LOAN_BY_SEARCH  + '?' + this.assembleParams(downloadParams))
        })
        .catch((e)=>{
            alert('请先搜索再导出！')
        });
    }
    render() {
        const {departmentId, legionId, legionList, validityStart, validityEnd, loanChannelCode, loanCode, loanCouponCode, pageIndex, couponStatus, isInquiring} = this.state
        const {departmentList, loanChannelList, loanDetailData, role} = this.props
        let canSearch = role == 'SOP'
        return (
            <div className={style['secondLevel']}>
                <div className={t_style['navi']} >
                    <span className={t_style['nav--title']} >贷款名额明细查询</span>
                </div>
                <div className={style['secondLevel__info']} style={{width:'calc(100% - 40px)', maxHeight: 'calc(100% - 80px)'}}>
                    <div className={style['secondLevel__info--basic']} >
                        <div className={style['secondLevel__info-title']} >
                            <div className={style['secondLevel__info-divider']} ></div>
                            <span>查询明细</span>
                        </div>
                        <div className={style['secondLevel__info--commodity']} >
                            <div className={style['secondLevel__info--item-b']} >
                                <div className={style['secondLevel__info-quarterPercent']} >
                                    <span className={classnames(style['secondLevel__info--basic-text'], style['secondLevel__info-halfPercent'])} >贷款名额批次：</span>
                                    <Input disabled={!canSearch} style={{width:'50%'}} value={loanCode} onChange={this.onLoanCodeChange} type="text"/>
                                </div>
                                <div className={style['secondLevel__info-quarterPercent']} >
                                    <span className={classnames(style['secondLevel__info--basic-text'], style['secondLevel__info-halfPercent'])} >贷款名额编号：</span>
                                    <Input style={{width:'50%'}} value={loanCouponCode} onChange={this.onCouponCodeChange} type="text"/>
                                </div>
                                <div className={style['secondLevel__info-halfPercent']} >
                                    <span className={classnames(style['secondLevel__info--basic-text'], style['secondLevel__info-halfPercent'])} style={{width:'20%'}} >所属军团：</span>
                                    <Select disabled={!canSearch} value={departmentId} onChange={this.onDepartmentChange} style={{width: '38%', marginRight:'2%'}} placeholder='请选择事业部' className={style['secondLevel__info-halfPercent']} >
                                        <Select.Option key='-1' value='-1' >请选择事业部</Select.Option>
                                        {this.renderDepartOptions(departmentList)}
                                    </Select>
                                    <Select disabled={!canSearch} value={legionId} onChange={this.onLegionChange} style={{width: '38%'}} placeholder='请选择军团' className={style['secondLevel__info-halfPercent']} >
                                        <Select.Option key='-1' value='-1' >请选择军团</Select.Option>
                                        {this.renderLegionOptions(legionList)}
                                    </Select>
                                </div>
                            </div>
                            <div className={style['secondLevel__info--item-b']} >
                                <div className={style['secondLevel__info-quarterPercent']} >
                                    <span className={classnames(style['secondLevel__info--basic-text'], style['secondLevel__info-halfPercent'])} >货款渠道：</span>
                                    <Select disabled={!canSearch} value={loanChannelCode} onChange={this.onChannelChange} placeholder='请选择贷款渠道' className={style['secondLevel__info-halfPercent']} >
                                        <Select.Option key='-1' value='-1' >请选择贷款渠道</Select.Option>
                                        {this.renderRadioOptions(loanChannelList)}
                                    </Select>
                                </div>
                                <div className={style['secondLevel__info-quarterPercent']} >
                                    <span className={classnames(style['secondLevel__info--basic-text'], style['secondLevel__info-halfPercent'])}>货款名额状态：</span>
                                    <Select disabled={!canSearch} value={couponStatus} onChange={this.onStatusChange} placeholder='请选择贷款名额状态' className={style['secondLevel__info-halfPercent']} >
                                        <Select.Option key='-1' value='-1' >请选择贷款名额状态</Select.Option>
                                        <Select.Option key='1' value='LOAN_COUPON_STATUS_ACTIVE' >未使用</Select.Option>
                                        <Select.Option key='2' value='LOAN_COUPON_STATUS_LOCKED' >锁定 </Select.Option>
                                        <Select.Option key='3' value='LOAN_COUPON_STATUS_USED' >已使用</Select.Option>
                                        <Select.Option key='4' value='LOAN_COUPON_STATUS_EXPIRED' >已过期</Select.Option>
                                    </Select>
                                </div>
                                <div className={style['secondLevel__info-halfPercent']} >
                                    <span className={classnames(style['secondLevel__info--basic-text'], style['secondLevel__info-halfPercent'])} style={{width:'20%'}} >有效期：</span>
                                    <DatePicker disabled={!canSearch} format={dateFormat} value={validityStart} onChange={this.onStartChange} onOpenChange={this.handleStartOpenChange} disabledDate={this.disabledStartDate} />
                                    <span className={style['secondLevel__info--basic-text']} >&nbsp;&nbsp;至&nbsp;&nbsp;</span>
                                    <DatePicker disabled={!canSearch} format={dateFormat} value={validityEnd} onChange={this.onEndChange} onOpenChange={this.handleEndOpenChange} disabledDate={this.disabledEndDate} />
                                </div>
                            </div>
                            <div className={classnames(style['secondLevel__info--item-b'], c_style['tar'])} >
                                <div className={style['secondLevel__info-halfPercent']} >
                                    <Button onClick={this.onReset} className={classnames(c_style['mr20'])} style={{width:60}}>重置</Button>
                                    <Button onClick={this.onFirstSearch} type="primary" className={classnames(style['button-choose'], c_style['mr20'])} style={{width:60}}>搜索</Button>
                                    <Button onClick={this.downloadLoan} type="primary" className={classnames(style['button-choose'], c_style['mr10'])} style={{width:60}}>导出</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classnames(style['secondLevel__info--basic'])} >
                        {loanDetailData.resultList.length > 0 ?
                        <table className={classnames(t_style['table'], c_style['mt20'], c_style['mb20']) } >
                            <thead>
                                <tr>
                                    <th style={{width:'14.28%'}} >贷款名额编号</th>
                                    <th style={{width:'14.28%'}} >贷款渠道</th>
                                    <th style={{width:'14.28%'}} >有效期</th>
                                    <th style={{width:'14.28%'}} >所属事业部</th>
                                    <th style={{width:'14.28%'}} >所属军团</th>
                                    <th style={{width:'14.28%'}} >贷款名额状态</th>
                                    <th style={{width:'14.28%'}} >订单号</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderLoanTable(loanDetailData.resultList)}
                            </tbody>
                        </table>
                        :
                        <div className={classnames(c_style['mb30'], t_style['text-center'])} >
                            <img  src={emptyDataImg}/>
                            <p className={classnames(c_style['mt10'], c_style['f24'], c_style['graybc'])} >暂无数据</p>
                        </div> }
                        {loanDetailData.resultList.length > 0 ? <Pagination className={classnames(c_style['mb30'], c_style['fr'], 'pagination__color')} showQuickJumper pageSize={loanDetailData.countPerPage} current={pageIndex} total={loanDetailData.totalCount} onChange={this.onPageChange}/> : null}
                    </div>
                </div>
                {isInquiring ? <Loading/> : null}
            </div>
        )
    }
}

export default InquireLoanDetail;