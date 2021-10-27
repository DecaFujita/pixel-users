import React from 'react';
import { withStyles } from '@material-ui/styles';
import { PIXEL_SIZE } from '../assets';

const styles = {
    pixel: {
        border: '1px solid black',
        width: PIXEL_SIZE,
        height: PIXEL_SIZE,
        cursor: 'pointer'
    }
}

const Pixel = props => {
    const { classes, on, handleClick, index } = props;
    return (
        <div
            className={classes.pixel}
            style={{backgroundColor: on ? 'white':'black'}}
            onClick={() => handleClick(index, on)}
        />
    )
};

export default withStyles(styles)(Pixel);