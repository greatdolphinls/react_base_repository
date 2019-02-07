import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './signin.css';
import { logIn } from '../../../actions';

const propTypes = {
  logIn: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  message: PropTypes.string.isRequired,
};

class SignIn extends Component{
  state = {
    email: '',
    password: '',
    redirectToReferrer: false
  };

  componentDidMount(){
    if (this.props.isAuth) 
    {
      this.setState({ redirectToReferrer: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isAuth !== nextProps.isAuth &&
      nextProps.isAuth === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  
  handleChange= (e) =>this.setState({ [e.target.name]: e.target.value });

  handleOnSubmit = async (e) => {
    e.preventDefault();
    await this.props.logIn(this.state.email, this.state.password);
    if (this.props.isAuth === true) this.props.history.push('/');
  };

  render(){

    let from = { pathname: '/' };
    if(this.props.isAdmin){
      from = { pathname: '/post' };
    }
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return(
      <div className="card signin">
        <article className="card-body">
          <Link to="/signup" className="float-right btn btn-outline-primary">Sign up</Link>
          <h4 className="card-title mb-4 mt-1">Sign in</h4>
          <form onSubmit={this.handleOnSubmit}>
            <div className="form-group">
              <label>Your email</label>
              <input 
                className="form-control" 
                placeholder="Email" 
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <Link to="/forget" className="float-right">Forgot?</Link>
              <label>Your password</label>
              <input
                className="form-control"
                placeholder="Password" 
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div> 
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block"> Sign In</button>
            </div>                                                           
          </form>
          {this.props.message}
        </article>
      </div>
    );
  }
}

SignIn.propTypes = propTypes;

const mapStateToProps = ({ auth }) => (
  {
    isAuth: auth.isAuth,
    isAdmin: auth.isRole === 'Admin',
    isFetching: auth.isFetching,
    message: auth.message,
  }
);

export default connect(mapStateToProps, { logIn })(SignIn);