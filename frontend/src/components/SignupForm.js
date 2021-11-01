import React, { Fragment, useState } from 'react';
import { auth } from '../services/user-services'; // posts username + password to api
import { useAuth } from '../hooks/useAuth';
import { withStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { register } from '../services/user-services';

const styles= {
    container: {
        color: 'grey',
        width: '100%',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        textAlign: 'center',
        border: '2px solid rgba(0,0,0,.05)',
        padding: '40px 70px 0 70px'
    },
    title: {
        marginBottom: '20px'
    }, 
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& label': {
            marginTop: '20px',
            marginBottom: '10px'
        },
        '& input': {
            textAlign: 'center',
            background: 'rgba(0,0,0,.05)',
            padding: '10px 20px',
            border: 'none',
            marginBottom: '15px',
            transition: 'all .5s',
            borderBottom: '2px solid rgba(0,0,0,.05)'
        },
        '& input:focus': {
            outline: 'none',
            background: 'white',
            borderBottom: '2px solid yellow'
        },
        '& button': {
            marginTop: '25px',
            marginBottom: '25px',
            padding: '10px 20px',
            borderRadius: '0',
            background: 'rgba(0,0,0,.4)',
            color: 'white',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all .5s',
        },
        '& button:hover': {
            background: 'rgba(0,0,0,.7)',
        },
        '& button:focus': {
            outline: 'none',
            background: 'rgba(0,0,0,.5)',
            border: '2px solid yellow'
        },
        '& a': {
            textDecoration: 'none',
        }
    }
}

const SignupForm = props => {
    const { classes } = props;
    const [ username, setUsername] = useState('');
    const [ password, setPassword ] = useState(''); 
    const [ password2, setPassword2 ] = useState(''); 
    const [ email, setEmail ] = useState(''); 
    const { setAuth } = useAuth('');
    const history = useHistory();

    const passMatch = () => {
        return password === password2; //returns true if passwords match
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (passMatch()) {
            const regData = await register({username, email, password, profile: {is_premium: false}});
            if (regData) {
                //logging in
                const data = await auth({username, password}) // posting to API to get credentials token and user info
                setAuth(data) // sending user info to context provider
                history.push('/account');
            }
        } else {
            console.log('not ok')
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.formContainer}>
                <h2 className={classes.title}>Welcome to <br/>PixelArtGallery!</h2>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Fragment>
                    <label>What's your name? </label>
                    <input label='username' onChange={e => setUsername(e.target.value)} />
                    </Fragment>
                    <Fragment>
                    <label>Enter your email. </label>
                    <input label='Email' type='email' onChange={e => setEmail(e.target.value)}/>
                    </Fragment>
                    <Fragment>
                    <label>Create a password. </label>
                    <input label='Password' type='password' onChange={e => setPassword(e.target.value)}/>
                    </Fragment>
                    <Fragment>
                    <label>Repeat your password. </label>
                    <input label='Password' type='password' onChange={e => setPassword2(e.target.value)}/>
                    </Fragment>
                    <button type='submit'>
                        Sign up
                    </button>
                    <p>Already have an account? <Link to={'/login'}>Log in →</Link></p>
                    <br/>
                    <br/>
                </form>
            </div>
        </div>
    )
};

export default withStyles(styles)(SignupForm);