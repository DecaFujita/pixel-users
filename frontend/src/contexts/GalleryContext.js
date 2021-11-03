import React, { useState, useEffect, createContext } from "react";
// import { uuid } from 'uuidv4';
// import useAPI from '../hooks/useAPI';
const GalleryContext = createContext();

const GalleryProvider = props => {
    const [ artList, setArtList ] = useState(null);
    const [ users, setUsers ] = useState(null);
  
    const loadArt = async() => {
        const art_response = await fetch('http://127.0.0.1:8000/api/art/'); 
        const art = await art_response.json();
        setArtList(art)
        // if (!art_response.ok) {
        //   throw new Error(`HTTP error! status:`);
        // }
    };
   
    const loadUsers = async() => {
      const users_response = await fetch('http://127.0.0.1:8000/api/users/'); 
      const usernames = await users_response.json();
      setUsers(usernames)
    };
  
    const saveNewArt = async(formData) => {
        const {title, artist, likes, pixelart} = formData
        const newPixelart = JSON.stringify(pixelart)
  
        const data = {title, artist, likes, pixelart: newPixelart}
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        };

        await fetch("http://127.0.0.1:8000/api/art/", requestOptions)
        await loadArt()
      };
    
    useEffect(() => {
        loadArt();
        loadUsers();
      }, [])

    return (
        <GalleryContext.Provider value={{artList, saveNewArt, users}}>
            {props.children}
        </GalleryContext.Provider>
    )
};

export {GalleryContext, GalleryProvider};
