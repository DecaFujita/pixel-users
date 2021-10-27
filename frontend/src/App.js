import React from "react";
import AddNew from './components/AddNew.component';
import Gallery from './components/Gallery.component';
import NavBar from './components/NavBar.component';
import PublicRoute from './components/PublicRoute';
import LoginForm from "./components/LoginForm";
import { GalleryProvider } from './contexts/GalleryContext';
import { Route, Switch } from 'react-router-dom';
import { DESKTOP_WIDTH } from './assets';
import { AuthProvider } from './hooks/useAuth';

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
                path='/signin'
                component={LoginForm} />
              {/* <Route 
                exact
                path='/signin'
                render={() => <LoginForm />}
              /> */}

              {/* PROFILEPAGE */}
          
            </Switch>
          </div>
        </div>
      </AuthProvider>
    </GalleryProvider>
  );
}

export default App;
