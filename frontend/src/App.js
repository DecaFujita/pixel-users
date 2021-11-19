import React from 'react';
import { GalleryProvider } from './contexts/GalleryContext';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from '@material-ui/styles';
import theme from './contexts/ThemeContext';
import AppPages from './AppPages';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <ThemeProvider theme={theme}>
      <GalleryProvider>
        <AuthProvider user={user}> 
          <AppPages />
        </AuthProvider>
      </GalleryProvider>
    </ThemeProvider>
  );
}

export default App;
