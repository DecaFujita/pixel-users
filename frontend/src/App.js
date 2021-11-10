import React from "react";
import AddNew from './components/AddNew.component';
import Gallery from './components/Gallery.component';
import NavBar from './components/NavBar.component';
import { PublicRoute, PrivateRoute } from './components/PublicRoute';
import LoginForm from "./components/user/LoginForm";
import Account from './components/user/Account';
import { GalleryProvider } from './contexts/GalleryContext';
import { Route, Switch } from 'react-router-dom';
import { DESKTOP_WIDTH } from './assets';
import { AuthProvider } from './hooks/useAuth';
import SignupForm from "./components/user/SignupForm";
// import MyGallery from './components/user/MyGallery';
import Following from './components/user/Following';
import Profile from './components/user/Profile';
import NotFound from "./components/NotFound";
import ArtView from "./components/ArtView";
import MyGallery from './components/user/MyGallery';

const App = () => {
  
  const user = JSON.parse(localStorage.getItem('user'));
  return (
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
                path='/add'
                render={() => <AddNew user={user}/>}
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
              {/* <Route
                path='/mygallery'
                render={() => <MyGallery user={user}/>}
              /> */}
              <PrivateRoute
                authed={user}
                path='/mygallery'
                component={MyGallery}
              />
              <PrivateRoute
                authed={user}
                path='/following'
                component={Following}
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
  );
}

export default App;
