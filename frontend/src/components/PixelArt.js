import React from 'react';
import { withStyles } from '@material-ui/styles';
import { PIXEL_SQ } from '../assets';
import PixelPreview from './PixelPreview';

const styles = {
    container: {
        width: PIXEL_SQ * 12,
        height: PIXEL_SQ * 12,
        display: 'flex',
        flexWrap: 'wrap'
    }
}

const PixelArt = props => {
    const { classes, art } = props;
    
    return (
        <div className={classes.container}>
            {JSON.parse(art).map((pixel, index) => <PixelPreview key={`pix-${index}`} on={pixel}/>)}
        </div>
    )
}

export default withStyles(styles)(PixelArt);