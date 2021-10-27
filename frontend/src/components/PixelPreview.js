import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    pixel: {
        width: '5%',
        height: '5%',
    }
}

const PixelPreview = props => {
    const { classes, on } = props;
    return (
        <div
            className={classes.pixel}
            style={{backgroundColor: on ? 'rgba(0,0,0,0.1)':'black'}}
        />
    )
};

export default withStyles(styles)(PixelPreview);