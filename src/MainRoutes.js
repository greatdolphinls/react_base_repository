import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {PrivateRoute} from './layout/route/PrivateRoute';
import {AdminRoute} from './layout/route/AdminRoute';

import Home from './container/Home/Home';
import About from './container/About/About';
import Post from './container/Post/Post';
import SignIn from './container/Authenticate/signin/signin';
import SignUp from './container/Authenticate/signup/signup';
import Forget from './container/Authenticate/forget/forget';
import JobList from './container/Job/JobList';
import JobCreate from './container/Job/JobCreate';
import JobEdit from './container/Job/JobEdit';
import JobShow from './container/Job/JobShow';
import JobDelete from './container/Job/JobDelete';


const MainRoutes = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Home} />
    <PrivateRoute exact path="/about" component={About} />
    <PrivateRoute exact path="/job" component={JobList} />
    <PrivateRoute exact path="/job/new" component={JobCreate} />
    <PrivateRoute exact path="/job/edit/:id" component={JobEdit} />
    <PrivateRoute exact path="/job/delete/:id" component={JobDelete} />
    <PrivateRoute exact path="/job/:id" component={JobShow} />
    <AdminRoute exact path="/post" component={Post} />
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/forget" component={Forget} />
    <Route component={Home} />
  </Switch>
);

export default MainRoutes;
