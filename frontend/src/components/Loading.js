import React from 'react';
import { withStyles } from '@material-ui/styles';



const styles = {
    
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingDot: {
        fontSize: '30px',
        color: 'silver',
        margin: '5px'
    },
    loadingDot1: {
        animation: '$twinkle 5s infinite',
    },
    loadingDot2: {
        animationDelay: '500ms',
        animation: '$twinkle 5s infinite',
    },
    loadingDot3: {
        animationDelay: '1000ms',
        animation: '$twinkle 5s infinite',
    },
    loadingDot4: {
        animationDelay: '1500ms',
        animation: '$twinkle 5s infinite',
    },
    loadingDot5: {
        animationDelay: '2000ms',
        animation: '$twinkle 5s infinite',
    },
    loadingText: {
        fontSize: '15px',
        color: 'grey'
    },
    '@keyframes twinkle': {
        '0%': { opacity: 0 },
        '50%': { opacity: 1 },
        '100%': { opacity: 0 }
      },
}

const Loading = props => {
    const { classes } = props
    return (
        <div className={classes.container}>
            <div className={classes.loading}>
                <p className={`${classes.loadingDot} ${classes.loadingDot1}`}>•</p>
                <p className={`${classes.loadingDot} ${classes.loadingDot2}`}>•</p>
                <p className={`${classes.loadingDot} ${classes.loadingDot3}`}>•</p>
                <p className={`${classes.loadingDot} ${classes.loadingDot4}`}>•</p>
                <p className={`${classes.loadingDot} ${classes.loadingDot5}`}>•</p>
            </div>
            <p className={classes.loadingText}>Loading...</p>
        </div>
        
    )
}

export default withStyles(styles)(Loading);