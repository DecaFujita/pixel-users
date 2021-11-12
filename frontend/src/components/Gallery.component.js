import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GalleryItem from './GalleryItem.components';
import { withStyles } from '@material-ui/styles';
import { GalleryContext } from '../contexts/GalleryContext';
import { useAuth } from '../hooks/useAuth';
import Cathegories from './Cathegories';
import { fetcher } from '../services/fetch-services';


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
    const [ filtered, setFiltered ] = useState(null);
    const [ art, setArt ] = useState(null)
    const { classes } = props;
    const { authData } = useAuth();
    const [ load, setLoad ] = useState(null);


    const submitCathegories = (val) => {
        setFiltered(parseInt(val, 10))
        setLoad(!load)
    }

    useEffect(() => {
        let isSubscribed = true;
        async function getData() {
            try {
                let art = await fetcher('/art');
                if (!filtered) {
                    isSubscribed && setArt(art)
                } else {
                    let filteredArt = art.filter(el => el.cathegory === filtered)
                    isSubscribed && setArt(filteredArt)
                }
            } catch (error) {
                console.log('error: ' + error);
            }
        };
      getData();

      return () => (isSubscribed = false)
    }, [load])

    return(
        <div className={classes.container}>
            <div className={classes.formCathegories}>
                <Cathegories submitCathegories={submitCathegories}/>
                {authData && <Link className={classes.add} to='/add'>+ new</Link>}
            </div>
            <div>
                <div className={classes.gallery}>
                    {art && art.map(a => 
                        <GalleryItem key={a.id} item={a}/>
                    )}
                </div>
            </div>
        </div>
    )
};

export default withStyles(styles)(Gallery);