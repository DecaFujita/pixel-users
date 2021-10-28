import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/styles';
import { useAuth } from '../hooks/useAuth';
import { Transition } from 'react-transition-group';
import DropdownMenu from './DropdownMenu';

const styles = {
    menu: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
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
}
const AccountButton = props => {
    const { classes } = props;
    const { authData } = useAuth();
    const [ isOpen, setIsOpen ] = useState(false);

    const duration = 300;
    const defaultStyle = {
        transition: `transform ${duration}ms ease-in-out`,
    }
    const transitionStyles = {
        entering: { transform: 'translateY(-500px)' },
        entered:  { transform: 'translateY(0)'},
        exiting:  { transform: 'translateY(0)' },
        exited:  { transform: 'translateY(-500px)'},
    };

    return (
        <Fragment>
            <div className={classes.menu} onClick={() => setIsOpen(!isOpen)}>
                <p>{authData.user.username}</p>
                {authData.user.profile &&
                    <img src={'http://127.0.0.1:8000'+authData.user.profile.image} alt='user avatar' className={classes.avatar} />
                }
            <Transition in={isOpen} timeout={300}>
                {state => (
                    <div style={{...defaultStyle, ...transitionStyles[state], zIndex:1, position:'absolute', right:'-30px', top: '-7px'}}>
                        <DropdownMenu />
                    </div>
                )}
            </Transition>             
            </div>
            
        </Fragment>
    )
}

export default withStyles(styles)(AccountButton);