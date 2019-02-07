import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './container/Home/Home';
import About from './container/About/About';
import Post from './container/Post/Post';
import SignIn from './container/Authenticate/signin/signin';
import SignUp from './container/Authenticate/signup/signup';
import Forget from './container/Authenticate/forget/forget';

import {PrivateRoute} from './layout/route/PrivateRoute';
import {AdminRoute} from './layout/route/AdminRoute';

const MainRoutes = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Home} />
    <PrivateRoute exact path="/about" component={About} />
    <AdminRoute exact path="/post" component={Post} />
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/forget" component={Forget} />
    <Route component={Home} />
  </Switch>
);

export default MainRoutes;
