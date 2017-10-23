import React, { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Constants from '../../constants/login'

//引入基础组件，header, menu, navi
import Header from '../../components/common/Header';
import style from '../../styles/less/project.less'

class CouponManagement extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const {dispatch} = this.props
        dispatch({type: Constants.GET_CURRENT_USER_REQUESTED})
    }
    render() {
        return (
            <div className={style['commodity__center']} >
                <Header dispatch={this.props.dispatch} userInfo={this.props.userInfo} />
                <div className={style['project__content']} style={{height:'calc(100% - 60px)'}} >
                    {this.props.children}
                </div>
            </div>
        )
    }
}

const getState = (state) => {
  return state ;
};

const getUserInfo = (state) => {
  return state.login ;
};

const selectors = createSelector(
  [getState, getUserInfo],
  (state, login) => {
    const { userInfo } = login;
    return  {...state, userInfo} ;
  }
)

export default connect(selectors)(CouponManagement);


