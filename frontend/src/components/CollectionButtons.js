import { withStyles } from '@material-ui/styles';
import React, { useEffect, useState, Fragment } from 'react';
import { useAuth } from '../hooks/useAuth';
import { fetcher } from '../services/fetch-services';

const styles = {
    bookmark: {
        marginTop: '70px',
        display: 'flex',
        '& i': {
            color: 'gold',
            marginRight: '10px',
            fontSize: '24px',
            transform: 'translateY(-3px)'
        }
    },
    remove: {
        marginTop: '10px',
        background: 'silver',
        padding: '10px 10px 5px 10px',
        color: 'white',
        cursor: 'pointer',
        '& i': {
            color: 'white', 
            fontSize: '18px',
            transform: 'translateY(-2px)'
        },
        '& p': {
            transform: 'translateY(-2px)'
        }
    },
    add: {
        background: 'yellow',
        padding: '10px 10px 5px 10px',
        color: 'black',
        cursor: 'pointer',
        '& i': {
            color: 'black', 
            fontSize: '18px',
            transform: 'translateY(-2px)'
        },
        '& p': {
            transform: 'translateY(-2px)'
        }
    }


}

const CollectionButtons = props => {
    const { authData } = useAuth();
    const { classes, artId } = props;
    const [ isCollected, setIsCollected ] = useState(false);
    const [ collection, setCollection ] = useState(null);
    const [ load, setLoad ] = useState(false);
    

    useEffect(() => {
        let isSubscribed = true;
        async function getData() {
            try {
                let response = await fetcher('/collection');
                let result = await response.find(item => item.art === parseInt(artId,10));
                let isCollected = await result.users.includes(authData.user.id);
                
                isSubscribed && setIsCollected(isCollected);
                isSubscribed && setCollection(result);
            } catch (error) {
                console.log('error: ' + error);
            }

        };
      getData();

      return () => (isSubscribed = false)
    }, [load])
   
    const removeFromCollection = async() => {
        let newUsers = await collection.users.map(el => el);
        let newUserArr =  await newUsers.filter(el => el !== authData.user.id)
        console.log(newUserArr)
        await fetch(`http://127.0.0.1:8000/api/collection/${collection.id}/`, {
            method: 'PATCH',
            body: JSON.stringify({
                users: newUserArr
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        setLoad(!load);
    }

    const addToCollection = async() => {
        let newCollection = [];
        if (!collection) {
            newCollection.push(authData.user.id)
            await fetch('http://127.0.0.1:8000/api/collection/', {
                method: 'POST',
                body: JSON.stringify({
                    art: artId,
                    users: newCollection
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        } else {
            newCollection = await collection.users.map(el => el);
            newCollection.push(authData.user.id)
            await fetch(`http://127.0.0.1:8000/api/collection/${collection.id}/`, {
                method: 'PATCH',
                body: JSON.stringify({
                    users: [1,2]
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        }
        setLoad(!load);
    }
    
    return (
        <div className={classes.btns}>
            {isCollected ?
                <Fragment>
                    <div className={`${classes.bookmark}`}>
                        <i className="fas fa-bookmark" />
                        <p> Collected!</p>
                    </div>
                    <div className={`${classes.bookmark} ${classes.remove}`} onClick={removeFromCollection}>
                        <i className="fas fa-ban"/>
                        <p>Remove from my collection.</p>
                    </div>
                </Fragment>
            :
                <div className={`${classes.bookmark} ${classes.add}`} onClick={addToCollection}>
                    <i className="far fa-bookmark" />
                    <p>Save to collection</p>
                </div>
            }
        </div>
    )
}



export default withStyles(styles)(CollectionButtons)