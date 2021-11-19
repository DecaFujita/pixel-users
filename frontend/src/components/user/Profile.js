import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../NotFound';
import { withStyles } from '@material-ui/styles';
import genericAvatar from '../../avatar-lg.png';
import ProfileGallery from './ProfileGallery';
import { useAuth } from '../../hooks/useAuth';
import { fetcher } from '../../services/fetch-services';

const styles = {
  avatar: {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    marginRight: '20px'
  },
  infoContainer: {
    marginTop: '70px',
    display: 'flex',
    '& h1': {
      marginBottom: '10px'
    },
    '& p': {
      fontSize: '12px'
    },
    '& button': {
      background: 'yellow',
      padding: '5px 20px',
      marginTop: '20px',
      border: '1px solid yellow',
      transition: 'all .2s linear',
      cursor:'pointer',
      '&:hover': {
        background: 'white'
      }
    }
  },
  usersGallery: {
    marginTop: '70px',
    '& h3': {
      marginBottom: '30px',
    }
  }
}

const Profile = props => {
  const { classes } = props;
  let { id } = useParams();
  const [ user, setUser ] = useState(null);
  const [ following, setFollowing ] = useState(0);
  const [ followed, setFollowed ] = useState(0);
  const [ followingList, setFollowingList ] = useState(null);
  const [ load, setLoad ] = useState(false);
  const [ isFollowing, setIsFollowing] = useState(false);
  const { authData } = useAuth();

  useEffect(() => {
    let isSubscribed = true;
    async function getData() {
      try {
        let [users, following] = await Promise.all([fetcher('/users'), fetcher('/following')]);
        let user = users.find(item => item.id === parseInt(id,10));
        let follows = following.find(el => el.user === parseInt(id,10))
        let followedBy = following.filter(el => el.following.includes(parseInt(id,10)))
        let isFollowing = followedBy.find(el => el.user === authData.user.id)
        if (isSubscribed) {
          setUser(user);
          setFollowingList(following);
          setFollowing(follows.following);
          setFollowed(followedBy);
          isFollowing ? setIsFollowing(true) : setIsFollowing(false);
        }
      } catch (error) {
        console.log('error: ' + error);
      }
    };
    getData();

    return () => (isSubscribed = false)
  }, [load])

  const unfollow = async() => {
    const userFollowing = followed.find(el => el.user === authData.user.id)
    const newUserFollowing = userFollowing.following.filter(el => el !== parseInt(id, 10))

    await fetch(`http://127.0.0.1:8000/api/following/${userFollowing.id}/`, {
      method: 'PATCH',
      body: JSON.stringify({
        following: newUserFollowing
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    setLoad(!load);
  }

  const follow = async () => { 
    const userFollowing = followingList.find(el => el.user === authData.user.id)
    console.log(userFollowing)
    if (userFollowing) {
      let newUserFollows = userFollowing.following.map(el => el);
      newUserFollows.push(parseInt(id, 10))
      await fetch(`http://127.0.0.1:8000/api/following/${userFollowing.id}/`, {
      method: 'PATCH',
      body: JSON.stringify({
        following: newUserFollows
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    } else {
      let addUser = [];
      addUser.push(parseInt(id,10));
      await fetch(`http://127.0.0.1:8000/api/following/`, {
        method: 'POST',
        body: JSON.stringify({
          user: authData.user.id,
          following: addUser,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
    }
    setLoad(!load);
  }

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
        <p> Following: {following.length || 0}</p>
        <p> Followed by: {followed.length || 0}</p>

        {!authData || authData.user.id === parseInt(id,10)
        ? 
        <div></div>
        :
        <div>
            {isFollowing
            ? <button onClick={unfollow}> Unfollow </button>
            : <button onClick={follow}> Follow </button>
            }
          </div>
          
        }
      </div>
      </div>
      <div className={classes.usersGallery}>
        <h3>{user.username}'s art gallery</h3>
        <ProfileGallery userId={parseInt(id, 10)} />
      </div>
    </div>
        
    :
      <NotFound info='User' />
    }
    </div>
  );
}

export default withStyles(styles)(Profile);