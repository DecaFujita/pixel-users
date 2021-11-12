import React, { useState } from 'react'
import { withStyles } from '@mui/styles';
import { useAuth } from '../../hooks/useAuth';
import DESKTOP_WIDTH from '../../assets';
import genericAvatar from '../../avatar-lg.png';
// import { useHistory } from 'react-router-dom';
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
    block: {
        display: 'flex',
    },
    blockEach: {
        background: 'rgba(0, 0, 0, 0.1)',
        margin: '10px',
        padding: '20px'
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
            marginBottom: '10px',
            transition: 'all .5s',
            borderBottom: '2px solid rgba(0,0,0,.05)'
        },
        '& input:focus': {
            outline: 'none',
            background: 'white',
            borderBottom: '2px solid yellow'
        }
    },
    btn: {
        marginTop: '10px',
        padding: '10px 20px',
        borderRadius: '0',
        background: 'rgba(0,0,0,.4)',
        color: 'white',
        fontSize: '14px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all .5s',
        '&:hover': {
            background: 'rgba(0,0,0,.7)',
        },
        '&:focus': {
            outline: 'none',
            background: 'rgba(0,0,0,.5)',
            border: '2px solid yellow'
        }
    },
    inputFile: {
        width: '0.1px',
        height: '0.1px',
        overflow: 'hidden',
        position: 'absolute',
        zIndex: '-1',
        fontSize: '1.25em',
        fontWeight: '700',
        display: 'inline-block',
        '&:focus': {
            background: 'red'
        },
        '&:hover': {
            background: 'red'
        }
    },
    inputLabel: {
        fontSize: '1.25em',
        fontWeight: '700',
        color: 'white',
        background: 'black',
        display: 'inline-block',
        background: 'red',
        '&:focus': {
            background: 'red'
        },
        '&:hover': {
            background: 'red'
        }
    }
}

const Account = props => {
    const { authData } = useAuth();
    const [image, setImage ] = useState();
    // const history = useHistory();
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
            <p>Here, you can manage your info.</p>
            <div>
                <div className={classes.block}>
                    <div className={classes.blockEach}>
                        <h3>Change <br/>your picture</h3>
                        <form onSubmit={uploadFile}>          
                            <input className={classes.inputFile} type='file' name="file" id="file" onChange={e => setImage(e.target.files[0])}  autoComplete="off"/>
                            <label clasName={classes.inputLabel} for='file'> Choose file </label>  
                            <button  className={classes.btn}  type='submit'>Upload file</button>
                        </form>
                    </div>
                    <div className={classes.blockEach}>
                        <h3>Change your password</h3>
                        <form onSubmit={submitChangePass} className={classes.form}>
                            <label>Old password</label>
                            <input label='Old password' type='password' autoComplete="off"
                                onChange={e => setOldPassword(e.target.value)}
                            />
                            <label>New password</label>
                            <input label='New password' type='password' autoComplete="off"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <label>Repeat new password</label>
                            <input label='Repeat password' type='password' autoComplete="off"
                                onChange={e => setPassword2(e.target.value)}
                            />
                            <button className={classes.btn} type='submit'>Change password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(Account);