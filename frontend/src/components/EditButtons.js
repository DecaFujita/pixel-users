import { withStyles } from '@material-ui/styles';
import React from 'react';
import { Link } from 'react-router-dom';


const styles = {
    container: {
        display: 'flex',
    },
    btn: {
        marginTop: '50px',
        display: 'flex',
        marginRight: '40px',
        cursor: 'pointer',
        textDecoration: 'none',
        '& i': {
            color: 'grey',
            marginRight: '5px',
            fontSize: '20px',
            transform: 'translateY(-3px)'
        }
    }
}

const EditButtons = props => {
    const { classes, art, deleteArt } = props;

    const handleDelete = (id) => {
        deleteArt(id)
        
    }

    return (
        <div className={classes.container}>

            <Link to={`/edit/${art.id}`} className={classes.btn} >
                <i className="fas fa-eraser"/>
                Edit
            </Link>
            <div className={classes.btn} onClick={() => handleDelete(art.id)}>
                <i className="far fa-trash-alt"/>
                Delete
            </div>
        </div>
    )
}



export default withStyles(styles)(EditButtons)