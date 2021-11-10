import React from 'react';
import { withStyles } from '@material-ui/styles';
import PixelPreview from './PixelPreview';
import { useHistory } from 'react-router-dom';

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    }
}

const PixelArt = props => {
    const { classes, pixelart, artId, pixelSquare} = props;
    const history = useHistory();

    const routeImg = (id) =>{ 
        history.push(`/art/${id}`);
      }

    return (
        <div className={classes.container} style={{width: pixelSquare, height: pixelSquare}} onClick={() => routeImg(artId)}>
            { pixelart && 
                JSON.parse(pixelart).map((pixel, index) => 
                    <PixelPreview key={`pix-${index}`} on={pixel} width='5%' height='5%'/>
                )
            }
        </div>
    )
}

export default withStyles(styles)(PixelArt);