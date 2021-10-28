import React from 'react';
import { withStyles } from '@material-ui/styles';
import { DESKTOP_WIDTH } from '../assets';
import { NavLink } from 'react-router-dom';
import AccountButton from './AccountButton';
import { useAuth } from '../hooks/useAuth';

const styles = {
    navbar: {
        backgroundColor: 'grey',
        height: '55px'
    },
    container: {
        width: DESKTOP_WIDTH,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%'
    },
    logo: {
        fontSize: '24px',
        color: 'white',
        marginRight: '20px',
        transform: 'translateY(-2px)',
        '& span': {
            color: 'yellow'
        }
    },
    menu: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& a': {
            marginLeft: '15px',
            textDecoration: 'none',
            color: 'white',
        }
    },
    signup: {
        color: 'yellow !important',
        border: '1px solid yellow',
        padding: '5px 10px',
    },
    active: {
        borderBottom: '1px dashed yellow',
        transform: 'translateY(1px)'
    },
}

const NavBar = props => {
    const { classes } = props
    const { authData } = useAuth();

    return(
        <div>
            <div className={classes.navbar}>
                <div className={classes.container}>
                    <div className={classes.menu}>
                        <div className={classes.logo}><span>PixelArt</span>Gallery</div>
                        <NavLink exact to='/' activeClassName={classes.active}>Home</NavLink>
                        <NavLink exact to='/cathegories' activeClassName={classes.active}>Cathegories</NavLink>
                        <NavLink exact to='/artists' activeClassName={classes.active}>Artists</NavLink>
                        <NavLink exact to='/newest' activeClassName={classes.active}>Newest</NavLink>
                    </div>
                    <div className={classes.menu}>
                        { authData ? 
                                <AccountButton />  
                        :
                            <div className={classes.menu}>
                                <NavLink exact to='/signin' activeClassName={classes.active}>Sign In</NavLink>
                                <NavLink exact to='/signup' activeClassName={classes.active} className={classes.signup}>Sign Up</NavLink>
                            </div>
                        }
                     </div>
                </div>
            </div>
            <div className='gallery'>
                <div className='gallery-item'/>
                <div className='gallery-item'/>
                <div className='gallery-item'/>
                <div className='gallery-item'/>
                <div className='gallery-item'/>
            </div>
        </div>
    )
};

export default withStyles(styles)(NavBar);