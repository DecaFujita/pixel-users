import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import { useAuth } from '../hooks/useAuth';

const styles = {
    menu: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'none',
        border: 'none',
        fontSize: '16px',
        color: 'white',
        cursor: 'pointer',
        position: 'relative',
        '& a': {
            marginLeft: '15px',
            textDecoration: 'none',
            color: 'white',
        }
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginLeft: '15px'
    },
    dropdown: {
        position: 'absolute',
        top: '32px',
        right: 0,
        background: 'grey',
        height: '200px',
        width: '200px',
    }
}
const AccountButton = props => {
    const { classes } = props;
    const { authData } = useAuth();
    const [ open, setOpen ] = useState(false);
    return (
        <button className={classes.menu} onClick={() => setOpen(!open)}>
            <p>{authData.user.username}</p>
            {authData.user.profile &&
                <img src={'http://127.0.0.1:8000'+authData.user.profile.image} alt='user avatar' className={classes.avatar} />
            }
            {open &&
                <h1 className={classes.dropdown}>ok?</h1>
            }
        </button>
    )
}

export default withStyles(styles)(AccountButton);