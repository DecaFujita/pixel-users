import { useState, useEffect } from 'react';

const useAPI = (inicial) => {
    const [state, setState] = useState(inicial);
    useEffect(() => {
        const loadArt = async() => {
            const art_response = await fetch('http://127.0.0.1:8000/api/art/'); 
            const art = await art_response.json();
            setState(art)
            // setState(art)
            // if (!art_response.ok) {
            //   throw new Error(`HTTP error! status:`);
            // }
        };
        loadArt();
    //     window.localStorage.setItem(key, JSON.stringify(state));
    // },[state]);
    },[]);
    return [state, setState];
}

export default useAPI;
