import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/styles';
import { fetcher } from '../services/fetch-services';
const styles = {
    select: {
        border: 'none',
        borderBottom: '1px solid grey',
        '&:focus': {
            outline: 'none'
        }
    }
}
const Cathegories = props => {
    const { submitCathegories, classes } = props;
    const [ cathegories, setCathegories ] = useState();


    const handleCathegoryChange = e => {
        submitCathegories(e.target.value)
    }

    useEffect(() => {
        let isSubmitted = true;

        const getCathegories = async() => {
            try {
                const response = await fetcher('/cathegories');
                isSubmitted && setCathegories(response)
            } catch (error) {
                console.log('error: ' + error)
            }
        };

        getCathegories();

        return () => {
            isSubmitted = false
        }
    }, [])

    return (
        <div>
            <select className={classes.select} id='cathegories' name='cathegories' onChange={handleCathegoryChange}>
                <option disabled selected></option>
                {cathegories && cathegories.map(cathegory => 
                    <option key={cathegory.title} value={cathegory.id}>{cathegory.title}</option>
                )}
            </select>
        </div>
    );
} 
export default withStyles(styles)(Cathegories);