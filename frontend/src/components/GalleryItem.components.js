import React, { Fragment, useContext } from 'react';
import PixelArt from './PixelArt';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { GalleryContext } from '../contexts/GalleryContext';
import { PIXEL_SQ } from '../assets';



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
            marginRight: '5px'
        } 
    }
}

const GalleryItem = props => {
    const { users, likes } = useContext(GalleryContext);
    const { classes, item } = props;
    const pixelSquare = PIXEL_SQ * 12;
    // const [ isLiked, setIsLiked ] = useState;

    let artist = 'loading...'
    let numLikes = ''
    if (users) {
        artist = users.find(user => user.id === item.artist);
    }
    
    return(
        <div className={classes.item}>
            <Fragment>
                <PixelArt pixelart={item.pixelart} artId={item.id} pixelSquare={pixelSquare}/>
                <div className={classes.caption}>
                    <Link to={`/profile/${artist.id}`} className={classes.userlink}>{artist.username}</Link>
                    <div  className={classes.likes}>
                        { numLikes 
                            ? <p>{item.art.liked_by.likes.length}</p>
                            : <p>0</p>
                        }
                        {/* <i className="fas fa-heart"/> */}
                        <i className="far fa-heart"/>
                    </div>
                </div>
            </Fragment>
        </div>
    )
};

export default withStyles(styles)(GalleryItem);