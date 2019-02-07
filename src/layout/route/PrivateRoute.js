import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: ComposedComponent, ...rest}) => {

  class Authentication extends Component {

      handleRender(props) {
          if (!this.props.isAuth) {
              return <Redirect to={{
                  pathname: '/signin'
              }} />
          } else {
              return <ComposedComponent {...props} />
          }
      }

      render() {
          return (
              <Route {...rest} render={this.handleRender.bind(this)} />
          )
      }
  }

  const mapStateToProps = ({ auth }) => (
    {
      isAuth: auth.isAuth
    }
  );

  const AuthenticationContainer = connect(mapStateToProps)(Authentication);
  return <AuthenticationContainer />
}