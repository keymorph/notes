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
  Collapse
} from "@mui/material";
import { DeleteIcon, EditIcon, MoreVert} from "@mui/icons-material";


function Note(props) {
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
  const [checked, setChecked] = useState(false);

  return (
    <Collapse in={checked} collapsedSize={250}>
    <Card
      sx={{ maxWidth: "225px", minHeight: "200", height: "auto", overflowWrap:"break-word", transition: "height 1s linear"}}
      style={{transition:"height 1s linear"}}

    >
      <Box sx={{backgroundColor: 'orange', height: '30px', position: 'relative'}}>
        {/* { props.category } */}
        {/* NONE */}
        <IconButton aria-label="settings" sx={{position:'absolute', right: '0px', padding: '0px'}} onClick={()=>{console.log("CHANGE")}}>
          <MoreVert sx={{color: 'white'}}/>
        </IconButton>
      </Box>

      <Grid>
        <Typography variant="subtitle1" title="Title Name">
          {/* { props.title } */}
          Grocery List
        </Typography>
      </Grid>
      <Divider variant="middle" />
      <CardContent onClick={() => setChecked( (prevState) => !prevState )} sx={{userSelect:'text'}}>
        <Typography variant="body2">
          {/* { props.description } */}
          There are words, words, words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,words, words,and more words
        </Typography>
      </CardContent>
      
    </Card>
    </Collapse>
  );
}

export default Note;