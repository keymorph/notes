import { useState } from "react";
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
  Button
} from "@mui/material";
import { DeleteIcon, EditIcon, MoreVert} from "@mui/icons-material";


function Note(props) {
  

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

        const [scale,setScale] = useState("scale(1, 1)")


  const [hover, setHover] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
    <Collapse in={checked} collapsedSize={250}>
    <Card
      sx={{ maxWidth: "200px", minHeight: "200px", height: "auto", overflowWrap:"break-word", transition: "height 1s linear", margin:"5px"}}
      style={{transform: scale, transition: "transform 0.1s linear" , zIndex: 10}}
      onMouseOver={() => setScale("scale(1.02,1.02")}
      onMouseLeave={() => setScale("scale(1, 1)")}
    >


      <Box sx={{backgroundColor: '#388a82', height: '30px', position: 'relative'}}>
        {/* { props.category } */}
        {/* NONE */}
        <IconButton aria-label="settings" sx={{position:'absolute', right: '0px', padding: '0px'}} 
          onClick={handleClick}
        >
          <MoreVert sx={{color: 'white'}}/>
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

      <Grid>
        <Typography variant="subtitle1" title="Title Name">
          {/* { props.title } */}
          Grocery List
        </Typography>
      </Grid>
      <Divider variant="middle" />
      <CardContent onClick={() => setChecked( (prevState) => !prevState )} sx={{userSelect:'text'}}>
        <Typography variant="body2" sx={{fontSize: "12px",}}>
          {/* { props.description } */}
          There are words, words, words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,and more words
        </Typography>
      </CardContent>
      
    </Card>
    </Collapse>
  );
}

export default Note;