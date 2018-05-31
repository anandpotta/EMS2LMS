import React from 'react';
import ReactDOM from 'react-dom'
import { Switch, Route, Redirect } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { withRouter, Link } from 'react-router-dom';

import Particles from 'react-particles-js';
import { config } from "./ParticleConfig";
import App from './App.jsx'
import LoginPage from "./LoginPage.jsx";
import SignUpPage from "./SignUpPage.jsx";
import Auth from '../store/auth';
import "./main.css";

const PageFade = (props) => {
  return (
    <CSSTransition
      {...props}
      classNames="fadeTranslate"
      timeout={1000}
      mountOnEnter={true}
      unmountOnExit={true}
    />
  )
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
);

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  }
  render() {
    const { match, history, location } = this.props;

    return (
      <div>
        {Auth.isUserAuthenticated()
          ? <PrivateRoute path="/" component={App} />
          : <div className="main">
            <Particles params={config} />
            <TransitionGroup>
              <PageFade key={location.pathname}>
                <Switch location={location}>
                  <Route path="/login" component={LoginPage} />
                  <Route path="/signup" component={SignUpPage} />
                  <Route exact path="/" component={LoginPage}  />
                </Switch>
              </PageFade>
            </TransitionGroup>
          </div>
        }
      </div>
    );
  }
}


export default withRouter(HomePage);
