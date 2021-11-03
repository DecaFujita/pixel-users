import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    title: {
        height: '80vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const NotFound = props => {
    const { classes, info } = props
    return (
        <div className={classes.title}>
            {info
            ? <h1>{info} not found.</h1>
            : <h1>Page not found.</h1>
            }
        </div>
    ) 
}

export default withStyles(styles)(NotFound);