import { withStyles } from '@material-ui/styles';
import React, { useEffect, useState, Fragment } from 'react';
import { useAuth } from '../hooks/useAuth';
import { fetcher } from '../services/fetch-services';


const styles = {
    container: {
        display: 'flex',
    },
    edit: {
        marginTop: '50px',
        display: 'flex',
        marginRight: '40px',
        color: 'grey',
        cursor: 'pointer',
        '& i': {
            color: 'grey',
            marginRight: '5px',
            fontSize: '20px',
            transform: 'translateY(-3px)'
        }
    }
}

const EditButtons = props => {
    const { classes, art, load, setLoad } = props;

    const handleEdit = () => {

        // setLoad(!load)
    }


    return (
        <div className={classes.container}>

            <div className={classes.edit} onClick={handleEdit}>
                <i className="fas fa-eraser"/>
                {art && console.log(art)}
                Edit
            </div>
            <div className={classes.edit} onClick={handleEdit}>
            <i className="far fa-trash-alt"/>
            Delete
        </div>
    </div>
    )
}



export default withStyles(styles)(EditButtons)