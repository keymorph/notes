import { useState } from "react";
import editIcon from "../../../images/edit-icon.svg";
import axios from "axios";
import {Card, CardHeader, CardContent,Typography, Grid, IconButton, Divider} from '@mui/material';
import {DeleteIcon, EditIcon, MoreVertIcon} from '@mui/icons-material';
// import { faEllipsisV } from '@fontawesome/free-solid-svg-icons/faEllipsisV';
// import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';

function Note() {
  
  const getNotes = async () => {
    axios
      .get("http://localhost:5000/api/showNotes")
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [hover, setHover] = useState(false);

  const [height, setHeight] = useState(300);

  return (

    <Card 
      sx={{maxWidth: 225, height: height, maxHeight: 500}} 
      onClick={()=>setHeight((height === 300) ? 'auto' : 300)}
    >
      
      <Grid container gridColumn={100} xs={{}}>
        Category
        <IconButton aria-label="settings" >
        </IconButton>
      </Grid>

      <CardHeader>
      </CardHeader>
      <Grid>
      <Typography variant='subtitle1' title='Title Name'>
      Title Name
      </Typography>
      </Grid>
      <Divider variant='middle'/>
      <CardContent>
        <Typography variant='body2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Note;