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
  const [category, setCategory] = useState(props.category)
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
  }, [])

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
        console.log(props.index);
        props.setNoteCollection(props.noteCollection.filter((note, index) => {
          

          // [1, 2, 3, 4, 5, 6, 7] --->  5
          // 
          console.log(index != props.index)
          return index != props.index
        }));
        setAnchorEl(null)

        console.log(response);
      })
      .catch((error) => {
        console.error(`Error: ${error}`)
      });
  }

  const handleDuplicate = () => {
    axios
      .post(`${url}/note`,
        {
          'title': `${props.title}`,
          'description': `${props.description}`,
          'category': `${props.category}`,
          'tags': `${props.tags}`,
        },
        {
          headers: {
            "auth-token": token,
          }
        }
      )
      .then((response) => {
        setAnchorEl(null)
        
        // Reflect the database changes on the front-end
        // Add the newly created note to the NoteCollection
        props.setNoteCollection(oldArray => [...oldArray, response.data])
      })
      .catch((error) => {
        console.error(`Error: ${error}`)
      });
  }

  // Define Note style values; height, width, etc.
  const minHeight = '200px';
  const maxHeight = '300px';
  const width = '200px';

  const categoryExists = () => {
    if (props.category != ('')) {
      return true;
    } else {
      return false;
    }
  }

  const categoryColorValue = (colorNumber) => {
    if (categoryExists()) {
      switch(colorNumber) {
        case 0: {
          // Red
          return '#999999';
        }
        case 1: {
          // Red
          return '#A26361';
        }
        case 2: {
          // Yellow
          return '#DEBB97';
        }
        case 3: {
          // Green
          return '#B4B387';
        }
        case 4: {
          // Blue
          return '#7789AB';
        }
      }
    } else {
      // There is no category, so return Grey
      return '#999999';
    }
  }

  return (
    <div style={{ display: 'flex', width: '100vwh', height: '100vh' }}>
      <NoteEditModal
        title={title}
        setTitle={setTitle}
        setDescription={setDescription}
        noteID={props.noteID}
        description={description}
        modalOpen={modalOpen}
        category={category}
        categories={props.categories}
        categoryID={props.categoryID}
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
        <Box style={{ backgroundColor: categoryColorValue(props.color), height: '40px', position: 'relative', opacity: 1 }}>

          {categoryExists() ? <Chip label={props.category}/> : null}

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
          style={{ opacity: modalOpen ? 0 : 1 }}
        >
          <MenuItem onClick={handleOpen}>Edit</MenuItem>
          <MenuItem onClick={handleDuplicate}>Duplicate</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>

        <CardActionArea onClick={handleOpen} style={{  height: "100%", opacity: modalOpen ? 0 : 1 }}>
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