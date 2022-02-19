import React, { useState } from 'react';
import axios from "axios";
import {
    Box,
    Button,
    Chip,
    TextField,
    Typography
} from '@mui/material';
import Modal from '@mui/material/Modal';

import Note from './Note';

export default function NoteCreateModal({ modalOpen, handleClose, setNoteCollection}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Homework');
    const [color, setColor] = useState(1);
    const [tags, setTags] = useState('Tag1');

    // Style of the Modal (SHOULD BE CHANGED LATER ON TO FIT MUI-THEME)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) scale(.9,.9)',
        width: 300,
        height: 350,
        bgcolor: 'background.paper',
        border: '5px solid #000',
        borderRadius:'10px',
        boxShadow: 24,
        p: 4,
        
    };

    const url = "http://localhost:8000/api";
    const token = localStorage.getItem("auth-token");

    const createNote = () => {
        axios
            .post(`${url}/note`,
                {
                    'title': `${title}`,
                    'description': `${description}`,
                    'category': `${category}`,
                    'color': `${color}`,
                    'tags': `${tags}`,
                },
                {
                    headers: {
                        "auth-token": token,
                    }
                }
            )
            .then((response) => {
                // Close the Modal.
                handleClose();

                // Empty the modal values.
                setTitle('');
                setDescription('');
                setCategory('');
                setTags('');

                // Reflect the database changes on the front-end
                // Add the newly created note to the NoteCollection
                setNoteCollection(oldArray => [...oldArray, response.data])
            })
            .catch((error) => {
                console.error(`Error: ${error}`)
            });
    };


    const fieldsAreEmpty = () => {
        if (title.length === 0) {
            return true;
        } else {
            return false;
        }
    };


/* 
IMPORTANT ------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
when we create a note:

{
    "title" : "Grey Note",
    "description" : "This note should be grey.",
    "category" : "Homework",
    "color" : 5,
    "tags" : "JotFox"
}
*/


    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
            onBackdropClick={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'

        >
            <Box sx={style}>
                <Typography variant='h6'>
                    Create a Note:
                </Typography>

                {/* Note Modal: TITLE Field */}
                <Typography
                    id='modal-modal-title' 
                    variant='h6'
                    component='h2'
                >
                    <TextField
                        required
                        id='outlined-required'
                        label='Title'
                        defaultValue={title}
                        onChange={event => setTitle(event.target.value)}
                        sx={{width: '100%'}}
                    />
                </Typography>

                {/* Note Modal: DESCRIPTION Field */}
                <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                    <TextField
                        id='outlined-multiline-static'
                        label='Description'
                        multiline
                        rows={4}
                        defaultValue={description}
                        onChange={event => setDescription(event.target.value)}
                        sx={{width: '100%'}}
                    />
                </Typography>

                {/* Note Modal: CATEGORY (Chips) Field */}
                <Typography>
                    <Chip
                        sx={{margin: '10px', position: 'absolute'}}
                        label='tag'
                    // onDelete={handleChipDelete}
                    // onChange={event => setCategory(event.target.value)}
                    />
                </Typography>

                <Button
                    variant="contained"
                    size="small"
                    disabled={fieldsAreEmpty()}
                    onClick={createNote}
                    sx={{border: '1px', position: 'absolute', right: '30px', bottom: '30px' }}
                >
                    CREATE
                </Button>
            </Box>
        </Modal>
    )
}