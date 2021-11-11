import React, { useEffect, useState } from 'react';
import Artist from './Artist';
import { withStyles } from '@material-ui/styles';


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

    const fetcher = async(path) => {
        let response = await fetch('http://127.0.0.1:8000/api' + path);
        return await response.json()
    }

    useEffect(() => {
        let isSubscribed = true;
        
        const getArt = async() => {
            try {
                const art = await fetcher('/users');
                const orderedArtList = art.sort((a,b) => {
                    return a.username.localeCompare(b.username);
                });
                isSubscribed && setOrder(orderedArtList)
            } catch (error) {
                console.log('error: ' + error)
            }
        };
        
        getArt();
        return () => (isSubscribed = false)
    }, [])
    
    return(
        <div className={classes.container}>
            <div>
                <div className={classes.gallery}>
                    {order && order.map(artist => 
                        <Artist key={`artist ${artist.id}`} artist={artist} />
                    )}
                </div>
            </div>
        </div>
    )
};

export default withStyles(styles)(Artists);