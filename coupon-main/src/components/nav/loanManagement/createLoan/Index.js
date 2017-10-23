import React from 'react'
import style from './style.less'
import t_style from '../../../../styles/less/com_blend.less'
import c_style from '../../../../styles/less/common.less'
import classnames from 'classnames'
import { Radio, DatePicker, Button, Select, Input } from 'antd'
import moment from 'moment'
import Constants from '../../../../constants/createLoan'
import Loading from '../../../common/loading/Spin'

const RadioGroup = Radio.Group
const dateFormat = 'YYYY/MM/DD'

class CreateLoan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loanChannelCode: '-1',
            validityStart: null,
            validityEnd: null,
            departmentId: '-1',
            legionId: '-1',
            count: '',
            errMsgs: {
                de: '',
                le: '',
                lo: '',
                co: '',
                vs: '',
                ve: '',
            },
            legionList: [],
            isInquiring: false
        }
    }
    componentDidMount(){
        const { dispatch } = this.props
        dispatch({type:Constants.CREATE_DEPARTMENT_LIST_REQUESTED})
        dispatch({type:Constants.CREATE_LOANCHANNEL_LIST_REQUESTED})
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
                value != '-1' && dispatch({type:Constants.CREATE_LEGION_LIST_REQUESTED, departmentId: value})
            }
        )
        this.resetErr()
    }
    onLegionChange = (value) => {
        console.log(value)
        this.setState({legionId: value})
        this.resetErr()
    }
    onChannelChange = (e) => {
        console.log(e.target.value)
        this.setState({
            loanChannelCode: e.target.value,
        });
        this.resetErr()
    }
    disabledStartDate = (validityStart) => {
        return validityStart && validityStart.valueOf()+ 86400000 <= Date.now()
    }
    disabledEndDate = (validityEnd) => {
        const validityStart = this.state.validityStart
        if (!validityStart) {
            return validityEnd
        }
        return validityEnd && validityEnd.valueOf() < validityStart.valueOf()
    }
    onCountChange = (e) => {
        console.log(e.target.value)
        this.setState({
            count: e.target.value,
        });
        this.resetErr()
    }
    onDateChange = (field, value) => {
        this.setState({
            [field]: value,
        });
        this.resetErr()
    }
    onStartChange = (value) => {
        const validityEnd = this.state.validityEnd
        if(validityEnd && validityEnd.valueOf() < value.valueOf()){
            this.onDateChange('validityEnd', null)
        }
        this.onDateChange('validityStart', value)
    }
    onEndChange = (value) => {
        this.onDateChange('validityEnd', value)
    }
    onSubmit = () => {
        const { dispatch } = this.props
        const { count, loanChannelCode, validityStart, validityEnd, departmentId, legionId } = this.state
        let errNum = 0
        let currentMsgs = {}
        const numReg = new RegExp(/^\d*$/)
        if(!departmentId || departmentId == '-1'){
            currentMsgs['de'] = '请选择事业部！'
            errNum += 1
        }
        if(!legionId || legionId == '-1'){
            currentMsgs['le'] = '请选择军团！'
            errNum += 1
        }
        if(!loanChannelCode || loanChannelCode == '-1'){
            currentMsgs['lo'] = '请选择贷款渠道！'
            errNum += 1
        }
        if(!count || !numReg.test(count)){
            currentMsgs['co'] = '请填写正确的数量！'
            errNum += 1
        }
        if(!validityStart || !validityEnd){
            currentMsgs['vs'] = '请选择完整的有效期起止时间！'
            errNum += 1
        } else if (validityStart.valueOf() >= validityEnd.valueOf()){
            currentMsgs['vs'] = '请保证有效期结束时间大于起始时间！'
            errNum += 1
        }
        if(errNum > 0){
            this.setState({errMsgs: currentMsgs})
        } else {
            this.setMask(true)
            dispatch({type:Constants.CREATE_LOAN_REQUESTED, setMask:this.setMask, onReset:this.onReset, addLoanParams: {count, loanChannelCode, validityStart: validityStart.format('YYYY-MM-DD'), validityEnd: validityEnd.format('YYYY-MM-DD'), departmentId, legionId}})
        }
    }
    onReset = () => {
        this.setState({
            loanChannelCode: '-1',
            validityStart: null,
            validityEnd: null,
            departmentId: '-1',
            legionId: '-1',
            count: '',
            errMsgs: {
                de: '',
                le: '',
                lo: '',
                co: '',
                vs: '',
                ve: '',
            },
            legionList:[]
        })
    }
    setMask = (bool) => {
        this.setState({isInquiring:bool})
    }
    resetErr = () => {
        this.setState({
            errMsgs: {
                de: '',
                le: '',
                lo: '',
                co: '',
                vs: '',
                ve: '',
            }
        })
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
    renderRadios = (loanChannelList) => {
        let loanRadios = loanChannelList.map((radio, index) => {
            return (<Radio key={index} value={radio.loanChannelCode}>{radio.loanChannelName}</Radio>)
        })
        return loanRadios
    }
    render() {
        const {departmentId, legionId, legionList, validityStart, validityEnd, count, loanChannelCode, errMsgs, isInquiring} = this.state
        const {departmentList, loanChannelList, role} = this.props
        return (
            <div className={style['secondLevel']}>
                <div className={t_style['navi']} >
                    <span className={t_style['nav--title']} >新建贷款名额</span>
                </div>
                <div className={style['secondLevel__info']} style={{width:'calc(100% - 40px)', maxHeight: 'calc(100% - 80px)'}}>
                    <div className={style['secondLevel__info--basic']} >
                        <div className={style['secondLevel__info-title']} >
                            <div className={style['secondLevel__info-divider']} ></div>
                            <span>新建批次</span>
                        </div>
                        <div className={style['secondLevel__info--commodity']} >
                            <div className={style['secondLevel__info--item-b']} >
                                <span className={style['secondLevel__info--basic-text']} >所属军团：</span>
                                <span className={t_style['icon-needed']} >*</span>
                                <Select value={departmentId} onChange={this.onDepartmentChange} style={{width: 200}} placeholder='请选择事业部' className={classnames(c_style['mr15'])} >
                                    <Select.Option key='-1' value='-1' >请选择事业部</Select.Option>
                                    {this.renderDepartOptions(departmentList)}
                                </Select>
                                <Select value={legionId} onChange={this.onLegionChange} style={{width: 200}} placeholder='请选择军团' className={classnames(c_style['mr15'])} >
                                    <Select.Option key='-1' value='-1' >请选择军团</Select.Option>
                                    {this.renderLegionOptions(legionList)}
                                </Select>
                                {(errMsgs['le'] || errMsgs['de']) ? <p className={c_style['red']} ><span className={style['secondLevel__info--basic-text']} style={{width:92, display:'inline-block'}}></span><span style={{width:215, display:'inline-block'}} >{errMsgs['de']}</span><span>{errMsgs['le']}</span></p> : null }
                            </div>
                            <div className={style['secondLevel__info--item-s']} >
                                <span className={style['secondLevel__info--basic-text']} >贷款渠道：</span>
                                <span className={t_style['icon-needed']} >*</span>
                                <RadioGroup onChange={this.onChannelChange} value={loanChannelCode}>
                                    {this.renderRadios(loanChannelList)}
                                </RadioGroup>
                                {errMsgs['lo'] ? <p className={c_style['red']} ><span className={style['secondLevel__info--basic-text']} style={{width:92, display:'inline-block'}}></span>{errMsgs['lo']}</p> : null}
                            </div>
                            <div className={style['secondLevel__info--item-b']} >
                                <p className={classnames(c_style['tar'], c_style['dib'])} ><span className={style['secondLevel__info--basic-text']} >数量：</span></p>
                                <span className={t_style['icon-needed']} >*</span>
                                <Input style={{width:120}} value={count} onChange={this.onCountChange} type="text"/>
                                <span className={style['secondLevel__info--basic-text']} >&nbsp;&nbsp;张</span>
                                {errMsgs['co'] ? <p className={c_style['red']} ><span className={style['secondLevel__info--basic-text']} style={{width:92, display:'inline-block'}}></span>{errMsgs['co']}</p> : null}
                            </div>
                            <div className={style['secondLevel__info--item-s']} >
                                <p className={classnames(c_style['tar'], c_style['dib'])} ><span className={style['secondLevel__info--basic-text']} >有效期：</span></p>
                                <span className={t_style['icon-needed']} >*</span>
                                <DatePicker format={dateFormat} value={validityStart} onChange={this.onStartChange} onOpenChange={this.handleStartOpenChange} disabledDate={this.disabledStartDate} />
                                <span style={{width: 40}} className={classnames(c_style['tac'], c_style['dib'])} >至</span>
                                <DatePicker format={dateFormat} value={validityEnd} onChange={this.onEndChange} onOpenChange={this.handleEndOpenChange} disabledDate={this.disabledEndDate} />
                                {(errMsgs['vs'] || errMsgs['ve']) ? <p className={c_style['red']} ><span className={style['secondLevel__info--basic-text']} style={{width:92, display:'inline-block'}}></span><span>{errMsgs['vs']}</span>&nbsp;&nbsp;&nbsp;<span>{errMsgs['ve']}</span></p> : null}
                            </div>
                            <div className={style['secondLevel__info--product']} >
                                <span className={style['secondLevel__info--basic-text']} style={{width:92, display:'inline-block'}}></span>
                                <Button disabled={role != 'SOP'} onClick={this.onSubmit} type="primary" className={classnames(style['button-choose'], c_style['mr20'])}>提交</Button>
                                <Button onClick={this.onReset} className={t_style['button-cancel']}>重置</Button>
                            </div>
                        </div>
                    </div>
                </div>
                {isInquiring ? <Loading/> : null}
            </div>
        )
    }
}

export default CreateLoan;