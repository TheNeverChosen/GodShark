import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import NotFound from '../pages/NotFound';
import Post from '../pages/Post';
import PublicRoute from '../components/PublicRoute';
import PrivateRoute from '../components/PrivateRoute';

export default function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <PublicRoute exact path='/signup' component={SignUp} />
        <PublicRoute exact path='/signin' component={SignIn} />
        <PrivateRoute exact path='/post' component={Post} /> 
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}