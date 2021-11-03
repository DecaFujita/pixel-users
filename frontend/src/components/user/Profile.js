import React, { useContext, useState, useEffect} from 'react';
import { GalleryContext } from '../../contexts/GalleryContext';
import { useParams } from 'react-router-dom';
import NotFound from '../NotFound';
import { withStyles } from '@material-ui/styles';
import genericAvatar from '../../avatar-lg.png';

const styles = {
  avatar: {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    marginRight: '20px'
  },
  infoContainer: {
    marginTop: '40px',
    display: 'flex',
    '& h1': {
      marginBottom: '10px'
    },
    '& p': {
      fontSize: '12px'
    },
    '& button': {
      background: 'gold',
      padding: '5px 20px',
      marginTop: '20px',
      border: '1px solid gold',
      transition: 'all .2s linear',
      '&:hover': {
        background: 'white'
      }
    }
  },
  usersGallery: {
    marginTop: '60px',
  }
}

const Profile = props => {
  const { users } = useContext(GalleryContext);
  const [ user, setUser ] = useState(null);
  let { id } = useParams();
  const { classes } = props;

  useEffect(() => {
    if (users) {
      let profileId = parseInt(id, 10);
      let artist = users.find(user => user.id === profileId)
      setUser(artist)
    }
  }, [])

  return (
    <div>
    {user ?
    <div>
      <div className={classes.infoContainer}>
      {user.profile.image
        ? <img src={user.profile.image} alt='user avatar' className={classes.avatar}/>
        : <img src={genericAvatar} alt='user avatar' className={classes.avatar}/>
    } 
      <div>
        <h1>{user.username}</h1>
        <p> Following: xx</p>
        <p> Followed by: xx</p>
        <button> Follow </button>
      </div>
      </div>
      <div className={classes.usersGallery}>
        <h3>{user.username}'s art gallery</h3>
      </div>
    </div>
        
    :
      <NotFound info='User' />
    }
    </div>
  );
}

export default withStyles(styles)(Profile);