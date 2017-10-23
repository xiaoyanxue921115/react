import React, { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import CreateLoan from '../../../../components/nav/loanManagement/createLoan/Index';

const getState = (state) => {
  return state.nav.createLoan ;
};

const selectors = createSelector(
  [getState],
  (state) => {
    return  state ;
  }
)

export default connect(selectors)(CreateLoan);


