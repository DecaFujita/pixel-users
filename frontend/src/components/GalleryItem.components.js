import React from 'react';
import PixelArt from './PixelArt';
import { withStyles } from '@material-ui/styles';

const styles = {
    item: {
        marginRight: '20px',
        marginBottom: '30px',
        '&:lastChild': {marginRight: '0'}
    },
    caption: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '10px',
        fontSize: '14px',
        transform: 'translateY(-10px)'
    }
}

const GalleryItem = props => {
    const { classes, item } = props;
    return(
        <div className={classes.item}>
            <PixelArt art={item.pixelart}/>
            <div className={classes.caption}>
                <p>Author: {item.artist}</p>
                <p>Likes: {item.likes}</p>
            </div>
        </div>
    )
};

export default withStyles(styles)(GalleryItem);