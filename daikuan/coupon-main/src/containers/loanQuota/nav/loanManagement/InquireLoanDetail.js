import React, { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import InquireLoanDetail from '../../../../components/nav/loanManagement/inquireLoanDetail/Index';

const getState = (state) => {
  return state.nav.inquireLoanDetail ;
};

const selectors = createSelector(
  [getState],
  (state) => {
    return  state ;
  }
)

export default connect(selectors)(InquireLoanDetail);


