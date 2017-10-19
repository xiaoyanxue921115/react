import React, { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import SecondLevel_11 from '../../../../components/nav2/firstLevel_1/secondLevel_1/Index';

const getState = (state) => {
  return state.nav2.secondLevel_11 ;
};

const selectors = createSelector(
  [getState],
  (state) => {
    return  state ;
  }
)

export default connect(selectors)(SecondLevel_11);


