import React, { useEffect, useState } from 'react';
import GalleryItem from '../GalleryItem.components';
import { withStyles } from '@material-ui/styles';
import { useAuth } from '../../hooks/useAuth';
import { fetcher } from '../../services/fetch-services';

const styles = {
    gallery: {
        margin: '20px auto',
        display: 'flex',
        flexWrap: 'wrap'
    }
}



const MyGallery = props => {
    const { classes } = props;
    const [ artList, setArtList ] = useState(null);
    const { authData } = useAuth();    


    useEffect(() => {
        let isSubscribed = true;
        
        const getArt = async() => {
            try {
                const art = await fetcher('/art');
                let filteredArt = art.filter(el => el.artist === authData.user.id)
                isSubscribed && setArtList(filteredArt)
            } catch (error) {
                console.log('error: ' + error)
            }
        };
        
        getArt();
        return () => (isSubscribed = false)
    }, [])
    
    


    return(
        <div>
            <div className={classes.gallery}>
            {artList && artList.map( art => 
                <GalleryItem key={art.id} item={art}/>
            )}
            </div>
        </div>
    )
};

export default withStyles(styles)(MyGallery);