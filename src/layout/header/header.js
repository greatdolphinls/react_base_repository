import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logOut } from '../../actions';

const propTypes = {
  logOut: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
class Header extends Component{

  handleLogOut = () => {
    this.props.logOut();
    this.props.history.push('/signin');
  }

  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <NavLink className="navbar-brand" to="/">BaseApp</NavLink>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to='/' exact> Home </NavLink></li>
            {this.props.isAdmin ?
              <React.Fragment>
                <li className="nav-item"><NavLink className="nav-link" to='/post' exact> Post </NavLink></li>
              </React.Fragment>
              : null
            }
            <li className="nav-item"><NavLink className="nav-link" to='/about' exact> About </NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to='/job' exact> Job </NavLink></li>
            {!this.props.isAuth ?
              <React.Fragment>
                <li className="nav-item"><NavLink className="nav-link" to='/signin' exact> Sign In </NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to='/signup' exact> Sign Up </NavLink></li>
              </React.Fragment>
              : null
            }
          </ul>
          {this.props.isAuth ?
            <React.Fragment>
              <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.handleLogOut}>Logout</button>
            </React.Fragment>
            : null
          }
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    );
  }
}
Header.propTypes = propTypes;

const mapStateToProps = ({ auth }) => (
  {
    isAuth: auth.isAuth,
    isAdmin: auth.isRole === 'Admin'
  }
);

export default withRouter(connect(mapStateToProps, { logOut })(Header));