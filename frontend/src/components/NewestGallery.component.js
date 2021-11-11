import React, { useEffect, useState } from 'react';
import GalleryItem from './GalleryItem.components';
import { withStyles } from '@material-ui/styles';


const styles = {
    container: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    gallery: {
        margin: '20px auto',
        display: 'flex',
        flexWrap: 'wrap'
    }
}

const NewestGallery = props => {
    const { classes } = props;
    const [ order, setOrder ] = useState(null);

    const fetcher = async(path) => {
        let response = await fetch('http://127.0.0.1:8000/api' + path);
        return await response.json()
    }

    useEffect(() => {
        let isSubscribed = true;
        
        const getArt = async() => {
            try {
                const art = await fetcher('/art');
                let orderedArtList =  await art.sort(function(a,b){
                    return new Date(b.timestamp) - new Date(a.timestamp);
                });
                isSubscribed && setOrder(orderedArtList)
            } catch (error) {
                console.log('error: ' + error)
            }
        };
        
        getArt();
        return () => (isSubscribed = false)
    }, [])
    
    return(
        <div className={classes.container}>
            <div>
                <div className={classes.gallery}>
                    {order && order.map(art => 
                        <GalleryItem key={art.id} item={art}/>
                    )}
                </div>
            </div>
        </div>
    )
};

export default withStyles(styles)(NewestGallery);