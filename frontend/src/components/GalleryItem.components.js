import React, { Fragment, useContext } from 'react';
import PixelArt from './PixelArt';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { GalleryContext } from '../contexts/GalleryContext';

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
    }
}

const GalleryItem = props => {
    const { users } = useContext(GalleryContext);
    const { classes, item } = props;
    users.find(user => user.id === item.artist)
    
    return(
        <div className={classes.item}>
            {users &&
            <Fragment>
                <PixelArt art={item.pixelart}/>
                <div className={classes.caption}>
                    <Link to={'/'}>{item.artist}</Link>
                    <p>Likes: {item.likes}</p>
                </div>
            </Fragment>
            }
        </div>
    )
};

export default withStyles(styles)(GalleryItem);