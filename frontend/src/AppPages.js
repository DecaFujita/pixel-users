import React from 'react';
import AddNew from './components/AddNew.component';
import Gallery from './components/Gallery.component';
import NavBar from './components/NavBar.component';
import { PublicRoute, PrivateRoute } from './components/PublicRoute';
import LoginForm from './components/user/LoginForm';
import Account from './components/user/Account';
import { Route, Switch } from 'react-router-dom';
import SignupForm from './components/user/SignupForm';
import Following from './components/user/Following';
import Profile from './components/user/Profile';
import NotFound from './components/NotFound';
import ArtView from './components/ArtView';
import MyGallery from './components/user/MyGallery';
import NewestGallery from './components/NewestGallery.component';
import Artists from './components/Artists';
import MyCollection from './components/user/MyCollection';
import { withStyles } from '@material-ui/styles';
import { useAuth } from './hooks/useAuth';

const styles = (theme) => ({
    root: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 90vw 1fr',
      gridTemplateRows: '55px 1fr'
    },
    container: {
      gridColumn: '2/3',
    }
});

const AppPages = props => {
  const { classes } = props;
  const { authData } = useAuth();

  let user = authData

  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.container}>
        <Switch>
          <Route 
            exact
            path='/'
            render={() => <Gallery />}
          />
          <Route 
            exact
            path='/newest'
            render={() => <NewestGallery />}
          />
          <Route 
            exact
            path='/add'
            render={() => <AddNew user={user}/>}
          />
          <Route 
            exact
            path='/edit/:id'
            render={() => <AddNew user={user}/>}
          />
          <Route 
            exact
            path='/artists'
            render={() => <Artists />}
          />
          <PublicRoute 
            authed={user}
            path='/signup'
            component={SignupForm}
          />
          <PublicRoute 
            authed={user}
            path='/login'
            component={LoginForm}
          />
          <PrivateRoute
            authed={user}
            path='/account'
            component={Account}
          />
          <PrivateRoute
            authed={user}
            path='/mycollection'
            component={MyCollection}
          />
          <PrivateRoute
            authed={user}
            path='/mygallery'
            component={MyGallery}
          />
          <Route
            path='/following/:id'
            render={() => <Following user={user}/>}
          />
          <Route exact path='/profile/:id'>
              <Profile />
          </Route>

          <Route exact path='/art/:id'>
              <ArtView user={user}/>
          </Route>
          
          <Route component={NotFound}/>
        </Switch>
      </div>
    </div>
  );
}

export default withStyles(styles)(AppPages);
