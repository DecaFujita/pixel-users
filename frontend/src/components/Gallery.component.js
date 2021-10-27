import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GalleryItem from './GalleryItem.components';
import { withStyles } from '@material-ui/styles';
import { GalleryContext } from '../contexts/GalleryContext';

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

const Gallery = props => {
    const { artList } = useContext(GalleryContext);
    const { classes } = props;

    return(
        <div className={classes.container}>
            <Link to='/add'>+ new</Link>
            <div>
                <div className={classes.gallery}>
                {artList.map(art => 
                    <GalleryItem key={art.id} item={art}/>
                )}
                </div>
            </div>
        </div>
    )
};

export default withStyles(styles)(Gallery);