import React from 'react';
import AddNew from './components/AddNew.component';
import Gallery from './components/Gallery.component';
import NavBar from './components/NavBar.component';
import { PublicRoute, PrivateRoute } from './components/PublicRoute';
import LoginForm from './components/user/LoginForm';
import Account from './components/user/Account';
import { GalleryProvider } from './contexts/GalleryContext';
import { Route, Switch } from 'react-router-dom';
import { DESKTOP_WIDTH } from './assets';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from '@material-ui/styles';
import SignupForm from './components/user/SignupForm';
// import MyGallery from './components/user/MyGallery';
import Following from './components/user/Following';
import Profile from './components/user/Profile';
import NotFound from './components/NotFound';
import ArtView from './components/ArtView';
import MyGallery from './components/user/MyGallery';
import NewestGallery from './components/NewestGallery.component';
import Artists from './components/Artists';
import MyCollection from './components/user/MyCollection';
import theme from './contexts/ThemeContext';

const App = () => {
  
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <ThemeProvider theme={theme}>
      <GalleryProvider>
        <AuthProvider user={user}>
          <div style={{height:'100vh'}}>
            <NavBar/>
            <div style={{width: DESKTOP_WIDTH, margin: '0 auto'}}>
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
        </AuthProvider>
      </GalleryProvider>
    </ThemeProvider>
  );
}

export default App;
