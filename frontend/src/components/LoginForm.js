import React, { Fragment, useState } from 'react';
import { auth } from '../services/user-services'; // posts username + password to api
import { useAuth } from '../hooks/useAuth';
import { withStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';

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
        height: '400px',
        textAlign: 'center',
        border: '2px solid rgba(0,0,0,.05)',
        padding: '40px 70px 0 70px'
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
            marginBottom: '20px',
            transition: 'all .5s',
            borderBottom: '2px solid rgba(0,0,0,.05)'
        },
        '& input:focus': {
            outline: 'none',
            background: 'white',
            borderBottom: '2px solid yellow'
        },
        '& button': {
            marginTop: '30px',
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
        }
    }
}

const LoginForm = props => {
    const { classes } = props;
    const [ username, setUsername] = useState('');
    const [ password, setPassword ] = useState(''); 
    const { setAuth } = useAuth('');
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await auth({username, password}) // posting to API to get credentials token and user info
        setAuth(data)
        history.push('/');
         // sending user info to context provider
    }

    return (
        <div className={classes.container}>
            <div className={classes.formContainer}>
                <h2>Welcome back!</h2>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Fragment>
                    <label>Username: </label>
                    <input onChange={e => setUsername(e.target.value)} />
                    </Fragment>
                    <Fragment>
                    <label>Password: </label>
                    <input label='Password' type='password' onChange={e => setPassword(e.target.value)}/>
                    </Fragment>
                    <button className={classes.btn} variant='contained' color='primary' type='submit'>
                        Log in
                    </button>
                </form>
            </div>
        </div>
    )
};

export default withStyles(styles)(LoginForm);