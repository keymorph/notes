import React from 'react';
import {
    Box,
    Chip,
    TextField,
    Typography
} from '@mui/material';
import Modal from '@mui/material/Modal';
import './style.css';

export default function NoteEditModal(props) {
    const { modalOpen, handleClose, description, title, handleChipDelete } = props;

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

    return (
        <Modal
            open={ modalOpen }
            onClose={ handleClose }
            onBackdropClick={ handleClose }
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={ style }>
                <Typography variant='h5'>
                    EDIT NOTE:
                </Typography>

                {/* Note Modal: TITLE Field */}
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                    <TextField
                        required
                        id='outlined-required'
                        label='Title'
                        defaultValue={ title }
                    />
                </Typography>

                {/* Note Modal: DESCRIPTION Field */}
                <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                    <TextField
                        id='outlined-multiline-static'
                        label='Description'
                        multiline
                        rows={ 4 }
                        defaultValue={ description }
                    />
                </Typography>

                {/* Note Modal: CATEGORY (Chips) Field */}
                <Typography>
                    <Chip
                        label='{props.category}'
                        onDelete={ handleChipDelete }
                    />
                </Typography>

            </Box>
        </Modal>
    )
}