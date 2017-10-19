import React, { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

//引入基础组件，header, menu, navi
import Header from '../../components/common/Header';
import style from '../../styles/less/project.less'

class CommodityCenter extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className={style['commodity__center']} >
                <Header {...this.props} />
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

const selectors = createSelector(
  [getState],
  (state) => {
    return  state ;
  }
)

export default connect(selectors)(CommodityCenter);


