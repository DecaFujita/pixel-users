import React, { useEffect, useState } from 'react';
import Artist from './Artist';
import { withStyles } from '@material-ui/styles';
import { fetcher } from '../services/fetch-services';


const styles = {
    container: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    gallery: {
        margin: '20px auto',
        display: 'flex',
        flexWrap: 'wrap'
    }
}

const Artists = props => {
    const { classes } = props;
    const [ order, setOrder ] = useState(null);

    useEffect(() => {
        let isSubscribed = true;
        
        const getArt = async() => {
            try {
                const users = await fetcher('/users');
                const orderedUserList = users.sort((a,b) => {
                    return a.username.localeCompare(b.username);
                });
                isSubscribed && setOrder(orderedUserList)
            } catch (error) {
                console.log('error: ' + error)
            }
        };
        
        getArt();
        return () => (isSubscribed = false)
    }, [])
    
    return(
        <div className={classes.container}>
            <div className={classes.gallery}>
                {order && order.map(artist => 
                    <Artist key={`artist ${artist.id}`} artist={artist} />
                )}
            </div>
        </div>
    )
};

export default withStyles(styles)(Artists);