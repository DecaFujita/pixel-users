import React, { useContext, useState } from 'react';
import Pixel from './Pixel';
import { withStyles } from '@material-ui/styles';
import { PIXEL_SQ, PIXEL_SIZE } from '../assets';
import { withRouter } from 'react-router';
import { GalleryContext } from '../contexts/GalleryContext';
import Cathegories from './Cathegories';

const styles = {
    grid: {
        maxHeigth: PIXEL_SQ * PIXEL_SIZE + PIXEL_SIZE + 15,
        maxWidth: PIXEL_SQ * PIXEL_SIZE + PIXEL_SIZE + 15,
        display: 'flex',
        flexWrap: 'wrap',
        border: '1px solid black'
    },
    column: {
        display: 'flex'
    },
    form: {
        marginLeft: '50px',
        '& div': {
            marginBottom: '20px'
        },
        '& label': {
            marginRight: '5px'
        },
        '& input': {
            border: 'none',
            borderBottom: '1px solid grey'
        },
        '& select': {
            border: 'none',
            borderBottom: '1px solid grey'
        },
        '& button': {
            borderRadius: '50px',
            border: 'none',
            backgroundColor: 'grey',
            marginRight: '5px',
            padding: '10px 20px',
            color: 'white'
        }
    }
}

const AddNew = props => {
    // const pixelGrid = new Array(PIXEL_SQ * PIXEL_SQ).fill(true);
    const { saveNewArt } = useContext(GalleryContext);
    const { classes, user } = props;
    const [ formData, setFormData ] = useState({
        title: '',
        artist: user.user.id,
        likes: 0,
        cathegory:'',
        pixelart: new Array(PIXEL_SQ * PIXEL_SQ).fill(true),
        

    }); //save form data

    const toggle = (index, value) => {
        let newArt = formData.pixelart.map(a => a);
        newArt.splice(index, 1, !value )
        setFormData({...formData, pixelart: newArt});
    }

    const handleTitleChange = e => {
        console.log(e.target.value)
        setFormData({...formData, title: e.target.value})
    }

    const submitCathegories = (val) => {
        setFormData({...formData, cathegory: parseInt(val)})
    }


    const handleSave = (e, formData) => {
        e.preventDefault();
        saveNewArt(formData);
        setTimeout(function(){
            props.history.push('/');
          }, 500)
        
    }

    return (
        <div>
            <h1>Create a new pixelart</h1>
            <div className={classes.column}>
                <div className={classes.grid}>
                    {formData && console.log(formData)}
                    {formData.pixelart.map((pixel, index) => <Pixel key={`pix-${index}`} index={index} on={pixel} handleClick={toggle}/>)}
                </div>
                <div>
                    <form className={classes.form}>
                        <div>
                            <label>Title:</label>
                            <input
                                id='art-title'
                                type='text'
                                autoComplete="off"
                                placeholder='Name your pixelart!'
                                value={formData.title}
                                onChange={handleTitleChange}
                            />
                        </div>
                        <div>
                            <label>Cathegories:</label>
                            <Cathegories submitCathegories={submitCathegories}/>
                        </div>
                        <button
                        onClick={e => handleSave(e, formData)}
                        >Save</button>
                        <button>Cancel</button>
                    </form>
                </div>
            </div>
        </div> 
    )
};

export default withRouter(withStyles(styles)(AddNew));