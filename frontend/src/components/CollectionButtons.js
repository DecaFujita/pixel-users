import { withStyles } from '@material-ui/styles';
import React, { useEffect, useState, Fragment } from 'react';
import { useAuth } from '../hooks/useAuth';
import { fetcher } from '../services/fetch-services';

const styles = {
    btns: {
        display: 'flex',
        flexDirection: 'column',
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
        width: '180px',
        height: '40px',
        background: 'white',
        border: '2px solid gold',
        cursor: 'pointer'
    },
    btn: {
        marginTop: '20px',
        border: 'none',
        width: '180px',
        height: '40px',
        cursor: 'pointer'
    },
}

const CollectionButtons = props => {
    const { authData } = useAuth();
    const { classes, artId } = props;
    const [ isCollected, setIsCollected ] = useState(false);
    const [ load, setLoad ] = useState(false);
    

    useEffect(() => {
        let isSubscribed = true;
        async function getData() {
            try {
                let response = await fetcher('/collection');
                let result = await response.find(item => item.art === parseInt(artId,10));
                let isCollected = await result.users.includes(authData.user.id);
                isSubscribed && setIsCollected(isCollected);
                
            } catch (error) {
                console.log('error: ' + error);
            }
        };
      getData();

      return () => (isSubscribed = false)
    }, [load])
   
    const removeFromCollection = async() => {

        REFAZER ESTE AQUI!!!
        
        let newCollection = [];
        if (!isCollected) {
            newCollection.push(authData.user.id)
            await fetch(`http://127.0.0.1:8000/api/collection/${collection.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    art: artId,
                    likes: newCollection
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        }
    }

    const addToCollection = async() => {
        let newCollection = [];
        if (!isCollected) {
            newCollection.push(authData.user.id)
            await fetch('http://127.0.0.1:8000/api/collection/', {
                method: 'FETCH',
                body: JSON.stringify({
                    art: artId,
                    likes: newCollection
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        } else {
            newCollection = collection.map(el => CONTINUAR AQUI!!!!!)
        }
    }
    
    return (
        <div className={classes.btns}>
            {isCollected ?
                <Fragment>
                    <button className={classes.btnFill}>Saved in my collection.</button>
                    <button className={classes.btn} onClick={removeFromCollection}>Remove from my collection.</button>
                </Fragment>
            :
                <button className={classes.btnStr} onClick={addToCollection}>Save to collection</button>
            }
        </div>
    )
}



export default withStyles(styles)(CollectionButtons)