import React from 'react';
import { withStyles } from '@material-ui/styles';
import genericAvatar from '../avatar-lg.png';


const styles = {
    container: {
        marginTop: '20px',
        marginBottom: '20px',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignCenter: 'center',
        textAlign: 'center'
    },
    avatar: {
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        marginBottom: '20px'
    },
    
}

const Artist = props => {
    const { classes, artist } = props;

    
    return(
        <div className={classes.container}>
            <div>
                { artist.profile.image 
                ?
                <img src={artist.profile.image} alt='user avatar' className={classes.avatar}/>
                :
                <img src={genericAvatar} alt='user avatar' className={classes.avatar}/>
                }
                <h3>{ artist.username }</h3>
            </div>
        </div>
    )
};

export default withStyles(styles)(Artist);