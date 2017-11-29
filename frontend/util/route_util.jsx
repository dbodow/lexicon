import React from 'react';
import { withRouter, Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Auth = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => (
    loggedIn ? (
      <Redirect to="/" />
    ) : (
      <Component {...props} />
    )
  )}/>
);

const Protected = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => (
    loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/signup" />
    )
  )}/>
);

const ProtectedExact = ({component: Component, path, loggedIn}) => (
  <Route exact path={path} render={(props) => (
    loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/signup" />
    )
  )}/>
);

const mapStateToProps = state => {
  return {loggedIn: Boolean(state.session.currentUser)};
};

export class ActionLink extends React.Component {
  // args: history, action, to, text
  navigateWithAction(e) {
    console.log("navigating...");
    e.preventDefault();
    this.props.action();
    this.props.history.push(this.props.to);
  }

  render() {
    return (
      <a onClick={this.navigateWithAction.bind(this)}>
        {this.props.text}
      </a>
    );
  }
}

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
export const ProtectedExactRoute = withRouter(connect(mapStateToProps, null)(ProtectedExact));
