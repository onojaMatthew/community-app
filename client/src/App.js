import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'react-image-crop/dist/ReactCrop.css';
import './App.scss';
import Auth from "./helper/Auth";
import Home from './views/Community/Home';
import Account from './views/Community/Account';
import AccountSignin from './views/Community/AccountSignin';
import TopicView from './views/Community/TopicView';
import Profile from './views/Community/Profile';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./containers/components/Login'));
const AccountrRegistration = React.lazy(() => import('./containers/components/Register'));
const EditContainer = React.lazy(() => import('./containers/components/Container'));

const Page404 = React.lazy(() => import('./views/Pages/Page404'));

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/" name="Login Page" render={props => <Home {...props}/>} />
            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
            <Route exact path="/register" name="Register Page" render={props => <AccountrRegistration {...props}/>} />
            <Route exact path="/community_signup" name="Register Page" render={props => <Account {...props}/>} />
            <Route exact path="/community_login" name="Register Page" render={props => <AccountSignin {...props}/>} />
            <Route exact path="/community/topic/:topicId" name="Topic Detail Page" render={props => <TopicView {...props}/>} />
            <Route exact path="/community_profile" name="Profile" render={props => <Profile {...props}/>} />
            <Route exact path="/complete_data" name="EditProfile Page" render={props => <EditContainer {...props}/>} />
             {Auth.isUserAuthenticated() ? (
              <Route path="/dashboard" name="Dashboard" render={props => <DefaultLayout {...props}/>} />
            ) : <Redirect to="/" />}
            <Route exact path="/*" name="Page 404" render={props => <Page404 {...props}/>} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
