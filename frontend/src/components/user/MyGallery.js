import React from 'react'
import { withStyles } from '@mui/styles';
import DESKTOP_WIDTH from '../../assets';


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

const MyGallery = props => {
    const { classes } = props;

    return (
        <div className={classes.container}>
            My Gallery
        </div>
    )
}

export default withStyles(styles)(MyGallery);