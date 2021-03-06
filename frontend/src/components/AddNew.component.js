import React, { useContext, useEffect, useState } from 'react';
import Pixel from './Pixel';
import { withStyles } from '@material-ui/styles';
import { PIXEL_SQ, PIXEL_SIZE } from '../assets';
import { withRouter } from 'react-router';
import { GalleryContext } from '../contexts/GalleryContext';
import Cathegories from './Cathegories';
import { useParams } from 'react-router-dom';
import { fetcher } from '../services/fetch-services';
import { useAuth } from '../hooks/useAuth';

const styles = {
    container: {
        marginTop: '10px',
    },
    title: {
      marginBottom: '10px'  
    },
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
            border: 'none',
            backgroundColor: 'silver',
            marginRight: '10px',
            padding: '10px 20px',
            color: 'black'
        }
    },
    cath: {
        display: 'flex'
    },
    save: {
        background: 'gold !important',
        color: 'black !important'
    }
}

const AddNew = props => {
    const { saveNewArt } = useContext(GalleryContext);
    const { classes, user } = props;
    const { id } = useParams();
    const [ formData, setFormData ] = useState({
        title: '',
        artist: user.user.id,
        likes: 0,
        cathegory: '',
        pixelart: new Array(PIXEL_SQ * PIXEL_SQ).fill(true),
    }); //save form data

    
    const toggle = (index, value) => {
        let newArt = formData.pixelart.map(a => a);
        newArt.splice(index, 1, !value )
        setFormData({...formData, pixelart: newArt});
    }

    const handleTitleChange = e => {
        setFormData({...formData, title: e.target.value})
    }

    const submitCathegories = (val) => {
        setFormData({...formData, cathegory: parseInt(val, 10)})
    }

    const handleSave = (e, formData) => {
        e.preventDefault();
        saveNewArt(formData);
        setTimeout(function(){
            props.history.push('/');
          }, 500)
    }

    const handleUpdate = async(e) => {
        console.log(formData.pixelart)
        e.preventDefault();
        await fetch(`http://127.0.0.1:8000/api/art/${id}/`, {
            method: 'PATCH',
            body: JSON.stringify({ 
                title: formData.title,
                cathegory: formData.cathegory,
                pixelart: JSON.stringify(formData.pixelart)
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        // updateArt(formData);
        // setTimeout(function(){
        //     props.history.push('/');
        // }, 500)
    }
    



    useEffect(() => {
        let isOn = true;
        async function fetchArt() {
            try {
                let art = await fetcher(`/art/${id}`)
                isOn && setFormData({...formData, title: art.title, cathegory: art.cathegory, pixelart: JSON.parse(art.pixelart)})
            } catch (error) {
                console.log('error: ' + error);
            }
        }
        fetchArt()
        return () => isOn = false
    }, [])
    

    return (
        <div className={classes.container}>
            {console.log('USER', user)}
            
            {id 
            ? <h2 className={classes.title}>Edit your pixelart</h2>
            : <h2 className={classes.title}>Create a new pixelart</h2>
            }

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
                                autoComplete="off"
                                placeholder='Name your pixelart!'
                                value={formData.title}
                                onChange={handleTitleChange}
                                required
                            />
                        </div>
                        <div className={classes.cath}>
                            <label>Cathegories:</label>
                            <Cathegories submitCathegories={e => submitCathegories(e, formData)}/>
                        </div>
                        {id ?
                        <button
                            className={classes.save}
                            onClick={e => handleUpdate(e, formData)}
                        >Update</button>
                        : <button
                        className={classes.save}
                        onClick={e => handleSave(e, formData)}
                    >Save</button>
                        
                        }
                        
                        <button>Cancel</button>
                    </form>
                </div>
            </div>
        </div> 
    )
};

export default withRouter(withStyles(styles)(AddNew));