
import React, { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

class Main extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

Main.defaultProps = {
};

const getState = (state) => {
  return state ;
};

const selectors = createSelector(
  [getState],
  (state) => {
    return state ;
  }
)

export default connect(selectors)(Main);


