import React from 'react'
import { withStyles } from '@material-ui/styles';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const styles = {
    dropdown: {
        width: '170px',
        position: 'absolute',
        top: '27px',
        right: '-30px',
        background: 'grey',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 !important',
        textAlign: 'center',
        '& button': {
            border: '1px solid white',
            background: 'transparent',
            color: 'white',
            padding: '10px 20px',
            margin: '10px',
            boxShadow: 'none',
            cursor: 'pointer',
            '&:hover': {
                boxShadow: '1px 1px 1px rgba(0,0,0,.3)',
                transform: 'translateY(-1px)'
            }
        },
    },
    dropdownItem: {
        padding: '20px',
        margin: '0 !important',
        width: '100%',
        background: 'grey',
        transition: 'background .2s linear',
        cursor: 'pointer',
        boxSizing: 'border-box',
        '&:hover': {
            background: 'silver',
        },
        
    }
}

const DropdownMenu = props => {
    const { classes } = props
    const { setAuth } = useAuth('');
    const history = useHistory();

    const logout = () => {
        setAuth(null);
        history.push('/');  
    }
    return (
        <div className={classes.dropdown}>
            <Link to={'/account'} className={classes.dropdownItem}>Account</Link>
            <Link to={'/following'} className={classes.dropdownItem}>Following</Link>
            <Link to={'/mygallery'} className={classes.dropdownItem}>My gallery</Link>
            <button onClick={() => logout()}>Log out</button>
        </div>
    )
}

export default withStyles(styles)(DropdownMenu);