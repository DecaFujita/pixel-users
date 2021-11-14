import React, { Fragment, useContext, useState, useEffect } from 'react';
import PixelArt from './PixelArt';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { GalleryContext } from '../contexts/GalleryContext';
import { PIXEL_SQ } from '../assets';
import { fetcher } from '../services/fetch-services';
import { useAuth } from '../hooks/useAuth';



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
    const { users } = useContext(GalleryContext);
    const { classes, item } = props;
    const pixelSquare = PIXEL_SQ * 12;
    const [ likes, setLikes ] = useState(null);
    const [ heart, setHeart ] = useState(false); 
    const { authData } = useAuth();

    let artist = 'loading...'
    if (users) {
        artist = users.find(user => user.id === item.artist);
    }
    
    useEffect(() => {
        let isSubscribed = true;
        async function getLikes() {
            try {
                let likes = await fetcher('/likes')
                let filteredLikes = await likes.find(res => res.art === item.id)
                if (authData) {
                    let userHeart = await filteredLikes.likes.includes(authData.user.id)
                    isSubscribed && setHeart(userHeart)
                }
                isSubscribed && setLikes(filteredLikes)
            } catch (error) {
                console.log('error: ' + error);
            }
        }
        getLikes()
        return () => (isSubscribed = false)
    }, [])

    return(
        <div className={classes.item}>
            <Fragment>
                <PixelArt pixelart={item.pixelart} artId={item.id} pixelSquare={pixelSquare}/>
                <div className={classes.caption}>
                    <Link to={`/profile/${artist.id}`} className={classes.userlink}>{artist.username}</Link>
                    <div  className={classes.likes}>
                        {likes 
                            ? <p>{likes.likes.length}</p>
                            : <p>0</p>
                        }
                        {heart
                            ? <i className="fas fa-heart"/>
                            : <i className="far fa-heart"/>
                        }
                    </div>
                </div>
            </Fragment>
        </div>
    )
};

export default withStyles(styles)(GalleryItem);