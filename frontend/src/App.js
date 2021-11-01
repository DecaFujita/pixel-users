import React from "react";
import AddNew from './components/AddNew.component';
import Gallery from './components/Gallery.component';
import NavBar from './components/NavBar.component';
import { PublicRoute, PublicRouteRev } from './components/PublicRoute';
import LoginForm from "./components/LoginForm";
import Account from './components/Account';
import { GalleryProvider } from './contexts/GalleryContext';
import { Route, Switch } from 'react-router-dom';
import { DESKTOP_WIDTH } from './assets';
import { AuthProvider } from './hooks/useAuth';
import SignupForm from "./components/SignupForm";

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
                render={() => <AddNew />}
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
              <PublicRouteRev 
                authed={user}
                path='/account'
                component={Account}
              />

              {/* PROFILEPAGE */}
          
            </Switch>
          </div>
        </div>
      </AuthProvider>
    </GalleryProvider>
  );
}

export default App;
