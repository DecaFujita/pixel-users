import React from 'react';

const PixelPreview = props => {
    const { width, height, on } = props;

    return (
        <div style={{width: width, height: height, backgroundColor: on ? 'rgba(0,0,0,0.1)':'black'}}
        />
    )
};

export default PixelPreview;