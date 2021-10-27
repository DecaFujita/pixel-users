import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {

}
function AccountButton() {
    return (
        <button className={classes.menu}>
            <p>{authData.user.username}</p>
            {authData.user.profile &&
                <img src={'http://127.0.0.1:8000'+authData.user.profile.image} alt='user avatar' className={classes.avatar} />
            }
        </button>
    )
}

export default withStyles(styles)(AccountButton);