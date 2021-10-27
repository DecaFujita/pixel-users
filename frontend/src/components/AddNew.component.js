import React, { useContext, useState } from 'react';
import Pixel from './Pixel';
import { withStyles } from '@material-ui/styles';
import { PIXEL_SQ, PIXEL_SIZE } from '../assets';
import { withRouter } from 'react-router';
import { GalleryContext } from '../contexts/GalleryContext';

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
    const [ formData, setFormData ] = useState({
        title: '',
        artist: 1,
        likes: 0,
        pixelart: new Array(PIXEL_SQ * PIXEL_SQ).fill(true)
    }); //save form data

    const { classes } = props;

    const toggle = (index, value) => {
        let newArt = formData.pixelart.map(a => a);
        newArt.splice(index, 1, !value )
        setFormData({...formData, pixelart: newArt});
    }

    const handleTitleChange = e => {
        console.log(e.target.value)
        setFormData({...formData, title: e.target.value})
    }

    const handleCathegoryChange = e => {
        console.log(e.target.value)
        setFormData({...formData, cathegory: e.target.value})
    }


    const handleSave = (e, formData) => {
        e.preventDefault();
        saveNewArt(formData);
        props.history.push('/');
    }

    return (
        <div>
            <h1>Create a new pixelart</h1>
            <div className={classes.column}>
                <div className={classes.grid}>
                    {formData.pixelart.map((pixel, index) => <Pixel key={`pix-${index}`} index={index} on={pixel} handleClick={toggle}/>)}
                </div>
                <div>
                    <form className={classes.form}>
                        <div>
                            <label>Title:</label>
                            <input
                                id='art-title'
                                type='text'
                                placeholder='Name your pixelart!'
                                value={formData.title}
                                onChange={handleTitleChange}
                            />
                        </div>
                        <div>
                            <label>Cathegories:</label>
                            <select id='cathegories' name='cathegories' onChange={handleCathegoryChange}>
                                <option value='arcade'>Arcade</option>
                                <option value='abstract'>Abstract</option>
                                <option value='cute'>Cute</option>
                                <option value='geometric'>Geometric</option>
                                <option value='other'>Other</option>
                            </select>
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