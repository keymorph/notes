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
import './style.css';
import Note from './Note';

export default function NoteCreateModal(props) {
    const { modalOpen, handleClose } = props;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Homework');
    const [tags, setTags] = useState('Tag1');

    // Style of the Modal (SHOULD BE CHANGED LATER ON TO FIT MUI-THEME)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
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
            props.setNoteCollection(oldArray => [...oldArray, response.data])
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

    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
            onBackdropClick={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={style}>
                <Typography variant='h5'>
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
                    />
                </Typography>

                {/* Note Modal: CATEGORY (Chips) Field */}
                <Typography>
                    <Chip
                        label='{props.category}'
                        // onDelete={handleChipDelete}
                        // onChange={event => setCategory(event.target.value)}
                    />
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    disabled={fieldsAreEmpty()}
                    onClick={createNote}
                >
                    CREATE
                </Button>
            </Box>
        </Modal>
    )
}