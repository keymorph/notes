import { useState, useRef, useEffect} from "react";
import editIcon from "../../../images/edit-icon.svg";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Divider,
  Box,
  Grid,
  Collapse,
  Menu,
  MenuItem,
  Button,
  CardActionArea,
  CardActions,
  TextField,
  Chip
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DeleteIcon, EditIcon, MoreHoriz} from "@mui/icons-material";
import Modal from '@mui/material/Modal';
import  './style.css'

function Note(props) {
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [scale,setScale] = useState("scale(1, 1)")
  const [cardHeight, setCardHeight] = useState("auto")
  const [flip, setFlip] = useState("rotate(0deg)")
  const [contentHeight, setContentHeight] = useState("")
  const [checked, setChecked] = useState(false);

  // MODAL
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
      setModalOpen(false);
      setCardHeight(contentHeight)
    };

  // MODAL: Category (Chip)
  const [chipCategory, deleteChip] = useState(false);
  // Delete the category for the note, and update the database.
  const handleChipDelete = () => { deleteChip(true) }   

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
    setContentHeight(ref.current.clientHeight);
    console.log(contentHeight)
    setCardHeight("200px")
  },[])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const expandButton = () => {
    setCardHeight(cardHeight != "200px" ? "200px" : contentHeight)
    setFlip("rotate(0deg)" === flip ? "rotate(180deg)" : "rotate(0deg)")
  }

  const handleEdit = () => {
  
    setAnchorEl(null)
  }

  const handleDelete = () => {

    setAnchorEl(null)
  }

  const handleDuplicate = () => {
    setAnchorEl(null)
  }

  return (
   
      <Card
        className="NoteCard"
        sx={{ maxWidth: "200px", minHeight: "200px",overflowWrap:"break-word", transition: "height 1s linear", margin:"5px",  }}
        style={{transform: scale, transition: "height 0.1s linear, transform 0.1s linear" , zIndex: 10, height: cardHeight, maxHeight:"600px", paddingTop: "0px !important"}}
        onMouseOver={() => setScale("scale(1.02,1.02")}
        onMouseLeave={() => setScale("scale(1, 1)")}
        ref={ref}
      >

      
        <Box sx={{backgroundColor: '#388a82', height: '40px', position:"relative" }}>
          {/* { props.category } */}
          {/* NONE */}
          <Chip label="Category" />

          <IconButton aria-label="settings" sx={{position:'absolute', right: '0px', padding: '0px'}} 
            onClick={handleClick}
          >
            <MoreHoriz sx={{color: 'white'}}/>
          </IconButton>
        </Box>

        <Menu 
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDuplicate}>Duplicate</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>

        <CardActionArea onClick={handleOpen}>
          <CardContent sx={{userSelect:'text'}}>
            <Grid>
              <Typography variant="subtitle1" title="Title Name">
                {/* { props.title } */}
                Grocery List
              </Typography>
            </Grid>

            <Divider variant="middle" />

            <Typography variant="body2" sx={{fontSize: "12px",}}>
              {/* { props.description } */}
              There are words, words, words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,and more words
            </Typography>
          </CardContent>
        </CardActionArea>

        <IconButton sx={{position:"absolute", right:0, bottom:0, transform: flip, transition:"transform 0.2s linear"}} onClick={expandButton}>
          <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
        </IconButton>

        <CardActions>
          <Modal
            open={modalOpen}
            onClose={handleClose}
            onBackdropClick={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography variant="h5">
                EDIT NOTE:
              </Typography>

              {/* Note Modal: TITLE Field */}
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <TextField
                  required
                  id="outlined-required"
                  label="Title"
                  defaultValue="{props.title}"
                />
              </Typography>

              {/* Note Modal: DESCRIPTION Field */}
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  defaultValue="{props.description}"
                />
              </Typography>

              {/* Note Modal: CATEGORY (Chips) Field */}
              <Typography>
                <Chip
                  label="{props.category}"
                  onDelete={handleChipDelete}
                />
              </Typography>

            </Box>
          </Modal>
        </CardActions>
    
      </Card>

  );
}

export default Note;