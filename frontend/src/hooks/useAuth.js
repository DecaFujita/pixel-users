import React, { useState, useContext, createContext } from "react";
const AuthContext = createContext(null);
export const AuthProvider = ({user, children}) => {
   
    const [ authData, setAuthData ] = useState(user);
    //passing data from API to the function
    const setAuth = newUser => { 
        if(newUser) {
        // save it to LocalStorage
            localStorage.setItem('user', JSON.stringify(newUser)); 
        } else {
            localStorage.removeItem('user'); // for logout use
        }
        setAuthData(newUser);
    }
    return (
        <AuthContext.Provider value={{authData, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);