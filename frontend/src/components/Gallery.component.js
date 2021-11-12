import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import GalleryItem from './GalleryItem.components';
import { withStyles } from '@material-ui/styles';
import { GalleryContext } from '../contexts/GalleryContext';
import { useAuth } from '../hooks/useAuth';
import Cathegories from './Cathegories';


const styles = {
    container: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    formCathegories: {
        display: 'flex',
        alignItems: 'center'
    },
    gallery: {
        margin: '20px auto',
        display: 'flex',
        flexWrap: 'wrap'
    },
    add: {
        marginLeft: '20px',
        background: 'yellow',
        padding: '5px 15px',
        borderRadius: '50px',
        textDecoration: 'none'
    }
}

const Gallery = props => {
    const { artList } = useContext(GalleryContext);
    const [ filtered, setFiltered ] = useState(artList);
    const { classes } = props;
    const { authData } = useAuth();

    const submitCathegories = (val) => {
        console.log(val)
    }



    return(
        <div className={classes.container}>
            <div className={classes.formCathegories}>
                <Cathegories submitCathegories={submitCathegories}/>
                {authData && <Link className={classes.add} to='/add'>+ new</Link>}
            </div>
            <div>
                <div className={classes.gallery}>
                    {filtered && filtered.map(art => 
                        <GalleryItem key={art.id} item={art}/>
                    )}
                    {/* {filtered && console.log(filtered)} */}
                </div>
            </div>
        </div>
    )
};

export default withStyles(styles)(Gallery);