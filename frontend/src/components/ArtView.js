import React, { useState, useEffect, Fragment } from 'react';
import { withStyles } from '@material-ui/styles';
import PixelArt from './PixelArt';
import { useParams, Link, useHistory } from 'react-router-dom';
import { PIXEL_SQ } from '../assets';
import Loading from './Loading';
import { fetcher } from '../services/fetch-services';
import CollectionButtons from '../components/CollectionButtons';
import EditButtons from './EditButtons';

const styles = {
    container: {
        marginTop: '50px',
        marginBottom: '30px',
        display: 'flex'
    },
    textContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginLeft: '50px',
        '& h2': {
            marginBottom: '5px'
        }
    },
    artist: {
        fontWeight: 'bold'
    },
    text: {
        display: 'flex',
        '& p': {
            marginRight: '5px',
            fontSize: '14px',
        },
        '& a': {
            textDecoration: 'none'
        }
    },
    sm: {
        fontSize: '8px',
        color: 'grey',
        marginLeft: '5px',
        transform: 'translateY(1px)'
    },
    btns: {
        display: 'flex',
        flexDirection: 'column',
    },
    btn: {
        marginTop: '20px',
        border: 'none',
        width: '180px',
        height: '40px',
    },
    signUp: {
        marginTop: '20px !important',
        fontSize: '12px',
        '& a': {
            textDecoration: 'none',
            fontWeight: 'bold'
        }
    },
    edit: {
        marginTop: '20px',
    }
}

const ArtView = props => {
    const { id } = useParams();
    const [ art, setArt ] = useState(null);
    const [ likes, setLikes ] = useState(null);
    const [ artist, setArtist ] = useState(null);
    const [ heart, setHeart ] = useState(false);  
    const [ load, setLoad] = useState(false);
    const pixelSquare = PIXEL_SQ * 20;
    const { classes, user } = props;
    const history = useHistory();
    let time;

    if (art) {
        time = new Date(art.timestamp).toLocaleString("en-US")
    }

    useEffect(() => {
        let isSubscribed = true;
        async function getLikes() {
            try {
                let likes = await fetcher('/likes')
                let filteredLikes = await likes.find(res => res.art === parseInt(id, 10))
                if (user) {
                    let userHeart = await filteredLikes.likes.includes(user.user.id)
                    isSubscribed && setHeart(userHeart)
                }
                // let numLikes = filteredLikes.likes.length
                isSubscribed && setLikes(filteredLikes)
            } catch (error) {
                console.log('error: ' + error);
            }
        }
        getLikes()
        return () => (isSubscribed = false)
    }, [load])

      
    useEffect(() => {
        let isSubscribed = true;
        async function getData() {
            try {
                let [artList, users] = await Promise.all([fetcher('/art'), fetcher('/users')]);
                let art = artList.find(item => item.id === parseInt(id,10));
                let artist = users.find(item => item.id === art.artist);
                if (isSubscribed) {
                    setArt(art);
                    setArtist(artist);
                }
            } catch (error) {
                console.log('error: ' + error);
            }
        };
      getData();

      return () => (isSubscribed = false)
    }, [])

    const deleteArt = async (id) => {
        await fetch(`http://127.0.0.1:8000/api/art/${id}`, {
            method: 'DELETE', 
        });
        history.push('/')


    }

    const handleLike = async(like_action) => {
        let newLikes = [];
        if (!likes) {
            newLikes.push(user.user.id)
            await fetch(`http://127.0.0.1:8000/api/likes/`, {
            method: 'POST',
            body: JSON.stringify({ 
                art: id,
                likes: newLikes
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        } else {
            if (like_action === 'unlikeIt') {
                newLikes = likes.likes.filter(el => el !== user.user.id)
            } else {
                newLikes = likes.likes.map(el => el)
                newLikes.push(user.user.id)
            } 
            await fetch(`http://127.0.0.1:8000/api/likes/${likes.id}/`, {
            method: 'PATCH',
            body: JSON.stringify({ 
                likes: newLikes
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        }
        setLoad(!load);
    }
    
    return (
        <Fragment>
        { art ?
            <div>
            <div className={classes.container}>
                <PixelArt pixelart={art.pixelart} pixelSquare={pixelSquare} />
                <div className={classes.textContent}>
                    <div>
                        <h2>{art.title}</h2>
                        <div className={classes.text}>
                            <p>by</p>
                        {artist &&
                            <Link to={`/profile/${artist.id}`} className={classes.artist}>{artist.username}</Link>
                        }
                            <p className={classes.sm}>on {time}</p>
                        </div>
                        <div className={classes.text} style={{marginTop:'15px'}}>
                        {user ? 
                            <Fragment>
                                {heart
                                    ? <i className="fas fa-heart" onClick={() => handleLike('unlikeIt')}/>
                                    : <i className="far fa-heart" onClick={() => handleLike('likeIt')}/>
                                }
                            </Fragment>
                        :
                            <i className="far fa-heart"/>
                        }
                        {likes 
                            ? <p style={{marginLeft:'5px'}}>{likes.likes.length}</p>
                            : <p style={{marginLeft:'5px'}}>0</p>
                        }
                        </div>
                    </div>
                    <div>
                        {user ?
                            <CollectionButtons artId={id}/>
                        :
                            <div className={classes.signUp}>Not a member yet? Sign up <Link to={'/signup'}>here.</Link></div>
                        }

                        {user.user.id === art.artist &&
                            <EditButtons art={art} load={load} setLoad={setLoad} deleteArt={deleteArt}/>
                        }
                       
                    </div>
                </div>
                
            </div>  
            <div>
                <h3>Comments</h3>
                {user &&
                    <div className={classes.text} style={{marginTop: '10px'}}>
                        <i className="fas fa-plus-square" style={{color: 'gold', marginRight: '10px'}}/>
                        <p> New comment</p>
                    </div>
                }
                
                </div>
            </div>  
        :
        <div>
           <Loading />
        </div>
        }
        </Fragment>
    ) 
}


export default withStyles(styles)(ArtView);