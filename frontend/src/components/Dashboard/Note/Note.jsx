import { useState, useRef, useEffect } from 'react';
import editIcon from '../../../images/edit-icon.svg';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Divider,
  IconButton,
  Grid,
  Menu,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DeleteIcon, EditIcon, MoreHoriz, Square } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import './style.css'

// Turn the Note grey, when the Modal is active.
import NoteSkeleton from './NoteSkeleton';

// Trigger the Modal when editing a Note
import NoteEditModal from './NoteEditModal'

function Note(props) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [scale, setScale] = useState('scale(1, 1)');
  const [cardHeight, setCardHeight] = useState('auto');
  const [flip, setFlip] = useState('rotate(0deg)');
  const [contentHeight, setContentHeight] = useState('');
  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState(props.title)
  const [description, setDescription] = useState(props.description)

  // MODAL
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    setAnchorEl(null);
  };

  // MODAL: Category (Chip)
  const [chipCategory, deleteChip] = useState(false);
  // Delete the category for the note, and update the database.
  const handleChipDelete = () => { deleteChip(true); }

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

  const ref = useRef(null)

  useEffect(() => {
    setCardHeight(ref.current.clientHeight);
  },[])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const url = "http://localhost:8000/api";
  const token = localStorage.getItem("auth-token");

  const handleDelete = () => {
    axios
      .delete(`${url}/note`,
        {
          headers: {
            "auth-token": token,
          },
          data: {
            "noteID": props.noteID,
          }
        }
      )
      .then((response) => {
        props.setNoteCollection(props.noteCollection.filter((note, index) => index != props.index));
        console.log(response);
      })
      .catch((error) => {
        console.error(`Error: ${error}`)
      });
  }

  const handleDuplicate = () => {
    setAnchorEl(null);
  }

  // Define Note style values; height, width, etc.
  const minHeight = '200px';
  const maxHeight = '300px';
  const width = '200px';

  // const { title = 'Grocery List' } = props;
  // const { title = 'WWWWWWWWWWW' } = props;
  // const { description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed eleifend sem, sit amet porttitor purus. Proin posuere urna vitae est pellentesque iaculis. Vivamus quis sapien erat. Mauris pretium urna at nulla maximus ornare. Nunc quis nibh turpis. Sed vehicula, metus finibus porta aliquam, mi quam ornare nisl, variable kapa frish albas comical' } = props;

  return (
    <div style={{ display: 'flex', width: '100vwh', height: '100vh' }}>
          <NoteEditModal
            title={title}
            setTitle={setTitle}
            setDescription={setDescription}
            noteID={props.noteID}
            description={description}
            modalOpen={modalOpen}
            handleClose={handleClose}
            handleChipDelete={handleChipDelete}
          />
    
         <Card
          className='NoteCard'
          sx={{ width: width, minHeight: minHeight, overflowWrap: 'break-word', transition: 'height 1s linear', margin: '5px', }}
          style={{ transform: scale, transition: 'height 0.1s linear, transform 0.1s linear', zIndex: 10, height: 'auto', maxHeight: maxHeight, paddingTop: '0px !important' }}
          onMouseOver={() => setScale('scale(1.02,1.02')}
          onMouseLeave={() => setScale('scale(1, 1)')}
          ref={ref}
        >
          <Box style={{ backgroundColor: '#388a82', height: '40px', position: 'relative',  opacity: 1}}>

            <Chip label='Category' />

            <IconButton
              aria-label='settings'
              sx={{ position: 'absolute', right: '0px', padding: '0px' }}
              onClick={handleClick}
            >
              <MoreHoriz sx={{ color: 'white' }} />
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            style={{opacity: modalOpen ? 0 : 1}}
          >
            <MenuItem onClick={handleOpen}>Edit</MenuItem>
            <MenuItem onClick={handleDuplicate}>Duplicate</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>

          <CardActionArea onClick={handleOpen} style={{ height: '100%', opacity: modalOpen ? 0 : 1 }}>
            <CardContent sx={{ userSelect: 'text' }}>

              <Grid>
                <Typography variant='subtitle1' title='Title Name'>
                  {title?.length > 11 ? `${title.substring(0, 10)}...` : title}
                </Typography>
              </Grid>

              <Divider variant='middle' />

              <Typography variant='body2' sx={{ fontSize: '12px', }}>
                {description?.length > 345 ? `${description.substring(0, 340)}...` : description}
              </Typography>

            </CardContent>
          </CardActionArea>

        </Card>
      
    </div>
  );
}

export default Note;