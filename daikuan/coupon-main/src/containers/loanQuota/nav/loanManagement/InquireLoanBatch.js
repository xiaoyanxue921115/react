import React, { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import InquireLoanBatch from '../../../../components/nav/loanManagement/inquireLoanBatch/Index';

const getState = (state) => {
  return state.nav.inquireLoanBatch ;
};

const selectors = createSelector(
  [getState],
  (state) => {
    return  state ;
  }
)

export default connect(selectors)(InquireLoanBatch);


