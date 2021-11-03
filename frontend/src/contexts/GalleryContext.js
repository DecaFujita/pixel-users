import React, { useState, useEffect, createContext } from "react";
// import { uuid } from 'uuidv4';
// import useAPI from '../hooks/useAPI';
const GalleryContext = createContext();

const GalleryProvider = props => {
    const [ artList, setArtList ] = useState(null);
    const [ users, setUsers ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    // const [ error, setError ] = useState(false);
  
    const loadArt = async() => {
        const art_response = await fetch('http://127.0.0.1:8000/api/art/'); 
        const art = await art_response.json();
        setArtList(art)
        if (!art_response.ok) {
          throw new Error(`HTTP error! status:`);
          // setError(true)
        }
    };
   
    const loadUsers = async() => {
      setLoading(true)
      await fetch('http://127.0.0.1:8000/api/users/')
      .then(resp => resp.json())
      .then(data => {
        setUsers(data);
      })
      setLoading(false)
    }
      
  
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

      // if (error) return <h1>Error</h1>
      if (loading) return <h1>Loading...</h1>
    return (
        <GalleryContext.Provider value={{artList, saveNewArt, users}}>
          {props.children}
        </GalleryContext.Provider>
    )
};

export {GalleryContext, GalleryProvider};
