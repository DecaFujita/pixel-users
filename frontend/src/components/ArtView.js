import React, { useContext, useState, useEffect, Fragment } from 'react';
import { withStyles } from '@material-ui/styles';
import PixelArt from './PixelArt';
import { useParams, Link } from 'react-router-dom';
import { PIXEL_SQ } from '../assets';

const styles = {
    container: {
        marginTop: '50px',
        marginBottom: '30px',
        display: 'flex'
    },
    textContent: {
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
    btnFill: {
        marginTop: '70px',
        border: 'none',
        width: '180px',
        height: '40px',
        background: 'yellow',
    },
    btnStr: {
        marginTop: '70px',
        border: 'none',
        width: '180px',
        height: '40px',
        background: 'white',
        border: '2px solid gold'
    }
}

const ArtView = props => {
    const { id } = useParams();
    const [ art, setArt ] = useState(null);
    const [ likes, setLikes ] = useState(null);
    const [ user, setUser ] = useState(null);
    const pixelSquare = PIXEL_SQ * 20;
    const { classes } = props;
    let time;

    if (art) {
        time = new Date(art.timestamp).toLocaleString("en-US")
    }



    const fetcher = async(path) => {
        let response = await fetch('http://127.0.0.1:8000/api' + path);
        return await response.json()
    }

    useEffect(() => {
        let isSubscribed = true;
        async function getData() {
            try {
                let likes = await fetcher('/likes')
                let filteredLikes = likes.find(res => res.art === parseInt(id, 10))
                let numLikes = filteredLikes.likes.length
                isSubscribed && setLikes(numLikes)
            } catch (error) {
                console.log('error: ' + error);
            }
        }
        getData()
        return () => (isSubscribed = false)
    }, [])

      
    useEffect(() => {
        let isSubscribed = true;
        async function getData() {
            try {
                let [artList, users] = await Promise.all([fetcher('/art'), fetcher('/users')]);
                let art = artList.find(item => item.id === parseInt(id,10));
                let user = users.find(item => item.id === art.artist);
                if (isSubscribed) {
                    setArt(art);
                    setUser(user);
                }
            } catch (error) {
                console.log('error: ' + error);
            }
        };
      getData();

      return () => (isSubscribed = false)
    }, [])

    

    return (
        <Fragment>
        { art &&
            <div>
            <div className={classes.container}>
                <PixelArt pixelart={art.pixelart} pixelSquare={pixelSquare} />
                <div className={classes.textContent}>
                    <h2>{art.title}</h2>
                    <div className={classes.text}>
                        <p>by</p>
                       {user &&
                        <Link to={`/profile/${user.id}`} className={classes.artist}>{user.username}</Link>
                       }
                        <p className={classes.sm}>on {time}</p>
                    </div>
                    <div className={classes.text} style={{marginTop:'15px'}}>
                    <i className="far fa-heart"/>
                    {likes 
                        ? <p style={{marginLeft:'5px'}}>{likes}</p>
                        : <p style={{marginLeft:'5px'}}>0</p>
                    }
                    </div>
                    <div className={classes.btns}>
                        {false ? 
                            <Fragment>
                                <button className={classes.btnFill}>Cutared</button>
                                <button className={classes.btn}>Remove from collection</button>
                            </Fragment>
                        :
                            <button className={classes.btnStr}>Save to collection</button>
                        }
                    </div>
                </div>
            </div>  
            <div>
                    <h3>Comments</h3>
                    <div className={classes.text} style={{marginTop: '10px'}}>
                    <i className="fas fa-plus-square" style={{color: 'gold', marginRight: '10px'}}/>
                    <p> New comment</p>
                    </div>
                </div>
            </div>  
        }
        </Fragment>
    ) 
}


export default withStyles(styles)(ArtView);