import React, { useContext } from 'react';
import GalleryItem from '../GalleryItem.components';
import { withStyles } from '@material-ui/styles';
import { GalleryContext } from '../../contexts/GalleryContext';


const styles = {
    gallery: {
        margin: '20px auto',
        display: 'flex',
        flexWrap: 'wrap'
    }
}

const MyGallery = props => {
    const { artList } = useContext(GalleryContext);
    const { classes, userId } = props;


    return(
        <div>
            <div className={classes.gallery}>
            {artList && artList.filter(art => art.artist === parseInt(userId,10)).map(art => 
                <GalleryItem key={art.id} item={art}/>
            )}
            </div>
        </div>
    )
};

export default withStyles(styles)(MyGallery);