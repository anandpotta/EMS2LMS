import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import checkCredentials from '../checkCredentials';
/**
 * Higher-order component (HOC) to wrap restricted pages
 */
export function BaseComponent() {
  class Restricted extends Component {
    componentWillMount() {
      this.checkAuthentication(this.props);
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps);
      }
    }
    checkAuthentication(params) {
      const { history } = params;
      checkCredentials()
        .catch(e => history.replace({ pathname: '/login' }));
    }
    render() {
      return <BaseComponent {...this.props} />;
    }
  }
  return withRouter(Restricted);
}
