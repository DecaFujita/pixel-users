import React, { useState, useEffect, createContext } from "react";
import { INICIAL_VAL } from '../assets';
// import { uuid } from 'uuidv4';
// import useAPI from '../hooks/useAPI';
const GalleryContext = createContext();

const GalleryProvider = props => {
    const [ artList, setArtList ] = useState(INICIAL_VAL);
  
    const loadArt = async() => {
        const art_response = await fetch('http://127.0.0.1:8000/api/art/'); 
        const art = await art_response.json();
        setArtList(art)
        // if (!art_response.ok) {
        //   throw new Error(`HTTP error! status:`);
        // }
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
        loadArt()
      }, [])

    return (
        <GalleryContext.Provider value={{artList, saveNewArt}}>
            {props.children}
        </GalleryContext.Provider>
    )
};

export {GalleryContext, GalleryProvider};
