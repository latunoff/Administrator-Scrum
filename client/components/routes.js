import React from 'react'; 
import { Switch, Route , IndexRoute } from 'react-router' ;
import HomeComponent from './home/home.component';
import SignupComponent from './account/signup.component';
import LoginComponent from './account/login.component';
import ForgotPasswordComponent from './account/forgot.password.component' ;
import ScrumComponent from './scrum/index' ;
import BoardComponent from './scrum/board.component' ;
import AuthenticateComponent from './../utils/authenticate.component'; 

const AppRoutes = () => (
  <Switch>
      <Route exact path='/' component={AuthenticateComponent(ScrumComponent)} />
      <Route path='/home' component={AuthenticateComponent(ScrumComponent)} />
      <Route path='/signup' component={SignupComponent} />
      <Route path='/login' component={LoginComponent} />
      <Route path='/forgot-password' component={ForgotPasswordComponent} />
      <Route path='/scrum' component={AuthenticateComponent(ScrumComponent)} />
      <Route path='/board/:id' component={AuthenticateComponent(BoardComponent)} />
  </Switch>
)

export default (
    <Route path='/' component={AppRoutes}> </Route>
)