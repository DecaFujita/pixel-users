import React, { useState } from 'react'
import { withStyles } from '@mui/styles';
import { useAuth } from '../../hooks/useAuth';
import DESKTOP_WIDTH from '../../assets';
import genericAvatar from '../../avatar-lg.png';
import { Link, useHistory } from 'react-router-dom';
import { uploadAvatar, changePass } from '../../services/user-services';
import { NotificationManager } from 'react-notifications';

const styles = {
    container: {
        width: DESKTOP_WIDTH,
        margin: '70px auto 10px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontSize: '24px',
        textTransform: 'capitalize',
        alignText: 'center',
        margin: '20px'
    },
    avatar: {
        width: '140px',
        height: '140px',
        borderRadius: '50%'
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

const Account = props => {
    const { authData, setAuth } = useAuth();
    const [image, setImage ] = useState();
    const history = useHistory();
    const [ oldPassword, setOldPassword ] = useState(''); 
    const [ password, setPassword ] = useState(''); 
    const [ password2, setPassword2 ] = useState(''); 
    const { classes } = props;
    
    const passMatch = () => {
        return password === password2; //returns true if passwords match
    }

    const uploadFile = async e => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append('image', image, image.name);

        const uploaded = await uploadAvatar(authData.user.profile.id, uploadData);
        if(uploaded) {
            NotificationManager.success("Image uploaded.");
        } else {
            NotificationManager.error("Uploaded failed");
        }
    }

    const submitChangePass = async e => {
        e.preventDefault()
        if (passMatch()) {
            console.log('old:', oldPassword, 'new:', password, 'new2:', password2)
            const passData = await changePass(
                {old_password: oldPassword, new_password: password},
                authData.user.id,
                authData.token
            );
            if(passData) {
                NotificationManager.success("Password have been changed.");
            }
        } else {
            NotificationManager.warning("Password doesn't match.");
        }
    }

    return (
        <div className={classes.container}>
            {authData.user.profile.image ?
                <img key={Date.now()} src={'http://127.0.0.1:8000'+authData.user.profile.image} alt='user avatar' className={classes.avatar} />
            :
                <img src={genericAvatar} alt='generic user avatar' className={classes.avatar} />
            }
            <div className={classes.title}>Hello, {authData.user.username}!</div> 
            <p>Manage your info here.</p>
            <div>
            <h1>Change your picture</h1>
            <form onSubmit={uploadFile}>
                <label>  
                    <p>Upload your avatar</p>              
                    <input type='file' onChange={e => setImage(e.target.files[0])}  autoComplete="off"/>
                </label>
                <button type='submit' variant='contained' color='primary'>Upload file</button>
            </form>
            <br/>
            <h1>Change your password</h1>
            <form onSubmit={submitChangePass}>
                <input label='Old password' type='password' autoComplete="off"
                    onChange={e => setOldPassword(e.target.value)}
                />
                <input label='New password' type='password' autoComplete="off"
                    onChange={e => setPassword(e.target.value)}
                />
                <input label='Repeat password' type='password' autoComplete="off"
                    onChange={e => setPassword2(e.target.value)}
                />
                <button type='submit' variant='contained' color='primary'>Change password</button>
            </form>
            </div>
        </div>
    )
}

export default withStyles(styles)(Account);