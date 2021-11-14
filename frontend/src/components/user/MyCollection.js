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



const MyCollection = props => {
    const { classes } = props;
    // const [ artList, setArtList ] = useState(null);
    const { authData } = useAuth();   
    const [ collection, setCollection] = useState(null)



    

    useEffect(() => {
        let isSubscribed = true;
        
        const getCollection = async() => {
            try {
                let [artList, collection] = await Promise.all([fetcher('/art'), fetcher('/collection')]);
                let collected = await collection.filter(el => el.users.includes(authData.user.id))
                let filteredArt = await collected.map(el => artList.filter(art => art.id === el.art))
                isSubscribed && setCollection(filteredArt)
                // console.log(filteredCollection)
                // isOn && setCollection(filteredCollection)    
            } catch (error) {
                console.log('error: ' + error)
            }
        };
        
        getCollection();
        return () => (isSubscribed = false)
    }, [])
    


    return(
        <div>
            <div className={classes.gallery}>
            {collection
            ? 
            collection.map( art => 
                <GalleryItem key={art[0].id} item={art[0]}/> )
            :
            <h3>You haven't collect anything yet.</h3>
            }
           
            </div>
        </div>
    )
};

export default withStyles(styles)(MyCollection);