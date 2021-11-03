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
        alignItems: 'center',
        height: '10px',
        fontSize: '14px',
        marginTop: '10px'
    },
    userlink: {
        fontWeight: 'bold',
        textDecoration: 'none',

    },
    likes: {
        display: 'flex',
        alignItems: 'center',
        '& p': {
            marginLeft: '5px'
        } 
    }
}

const GalleryItem = props => {
    const { users } = useContext(GalleryContext);
    const { classes, item } = props;

    let artist = 'loading...'
    if (users) {
        artist = users.find(user => user.id === item.artist);
    }
    
    return(
        <div className={classes.item}>
            <Fragment>
                <PixelArt art={item.pixelart}/>
                <div className={classes.caption}>
                    <Link to={`/profile/${artist.id}`} className={classes.userlink}>{artist.username}</Link>
                    <div  className={classes.likes}>
                        {/* <i class="fas fa-heart"/> */}
                        <i class="far fa-heart"/>
                        <p>{item.likes}</p>
                    </div>
                    
                </div>
            </Fragment>
        </div>
    )
};

export default withStyles(styles)(GalleryItem);