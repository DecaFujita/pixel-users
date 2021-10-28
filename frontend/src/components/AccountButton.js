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
    profile: {
        display: 'flex',
        width: '150px',
        height: '55px',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 2,
        background: 'grey'
    }
}
const AccountButton = props => {
    const { classes } = props;
    const { authData } = useAuth();
    const [ isOpen, setIsOpen ] = useState(false);

    const duration = 300;
    const defaultStyle = {
        transition: `transform ${duration}ms ease-in-out`,
        zIndex: 1
    }
    const transitionStyles = {
        entering: { transform: 'translateY(-300px)' },
        entered:  { transform:  'translateY(0)' },
        exiting:  { transform: 'translateY(0)' },
        exited:  { transform:  'translateY(-300px)' },
    };

    return (
        <Fragment>
            <div className={classes.menu} onClick={() => setIsOpen(!isOpen)}>
                <div className={classes.profile}>
                    <p>{authData.user.username}</p>
                    {authData.user.profile &&
                        <img src={'http://127.0.0.1:8000'+authData.user.profile.image} alt='user avatar' className={classes.avatar} />
                    }  
                </div>   
            </div>
            <Transition in={isOpen} timeout={300}>
                {state => (
                    <div style={{...defaultStyle, ...transitionStyles[state]}}>
                        <DropdownMenu style={{...defaultStyle, ...transitionStyles[state]}} />
                    </div>
                )}
            </Transition>        
            
        </Fragment>
    )
}

export default withStyles(styles)(AccountButton);