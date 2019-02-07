import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const AdminRoute = ({ component: ComposedComponent, ...rest}) => {

  class AdminAuth extends Component {

      handleRender(props) {
          if (!this.props.isAuth) {
              return <Redirect to={{
                  pathname: '/signin'
              }} />
          } else {
            if (!this.props.isAdmin) {
                return <Redirect to={{
                    pathname: '/'
                }} />
            }else{
              return <ComposedComponent {...props} />
            }
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
      isAuth: auth.isAuth,
      isAdmin: auth.isRole === 'Admin'
    }
  );

  const AdminAuthContainer = connect(mapStateToProps)(AdminAuth);
  return <AdminAuthContainer />
}