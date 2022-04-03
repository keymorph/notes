import React from 'react';
import {Card} from  '@mui/material';

export default function NoteSkeleton (props) {
    return (
        <Card style={{...props.style, backgroundColor:"red"}}/>
    )
}

