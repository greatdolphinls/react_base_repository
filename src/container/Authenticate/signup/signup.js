import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUser, failedPasswordConfirm } from '../../../actions';

const propTypes = {
  createUser: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  isCreated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  message: PropTypes.string.isRequired,
};

class SignUp extends Component{

  state = {
    firstname: '',
    lastname: '',
    birthday: '',
    gender: 'male',
    email: '',
    password: '',
    confirmpassword: '',
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
    const { firstname, lastname, birthday, gender, email, password, confirmpassword } = this.state;
    if (password === confirmpassword) {
      const newUser = { firstname, lastname, birthday, gender, email, password };
      await this.props.createUser(newUser);
      if (this.props.isCreated) {
        this.props.history.push('/signin');
      }
    } else {
      this.props.failedPasswordConfirm();
    }
  };

  render(){
    let from = { pathname: '/' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return(
      <div className="card signin">
        <article className="card-body">
          <Link to="/signin" className="float-right btn btn-outline-primary">Back</Link>
          <h4 className="card-title mb-4 mt-1">Sign Up</h4>
          <form onSubmit={this.handleOnSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputFirstName">First Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="inputFirstName" 
                  placeholder="First Name"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.handleChange}
                  required  
                  />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputLastName">Last Name</label>
                <input 
                  type="text"
                  className="form-control" 
                  id="inputLastName" 
                  placeholder="Last Name" 
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleChange}
                  required  
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputBirthday">Birthday</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="inputBirthday"
                  name="birthday"
                  value={this.state.birthday}
                  onChange={this.handleChange}
                  required 
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputGender">Gender</label>
                <select id="inputGender" className="form-control">
                  <option >Choose...</option>
                  <option value="male"> Male </option>
                  <option value="female"> Female </option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="inputEmail">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="inputEmail" 
                  placeholder="Email" 
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="inputPassword" 
                  placeholder="Password" 
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputConfirmPassword">Confirm Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="inputConfirmPassword" 
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  value={this.state.confirmpassword}
                  onChange={this.handleChange}
                  required 
                />
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block"> Sign Up</button>
            </div> 
          </form>
          {this.props.message}
        </article>
      </div>
      );
  }
}

SignUp.propTypes = propTypes;

const mapStateToProps = ({ auth, newUser }) => (
  {
    isAuth: auth.isAuth,
    isCreated: newUser.isCreated,
    isFetching: newUser.isFetching,
    message: newUser.message,
  }
);

export default connect(mapStateToProps, { createUser, failedPasswordConfirm })(SignUp);
