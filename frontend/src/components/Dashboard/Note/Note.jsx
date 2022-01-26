import { useState } from "react";
import editIcon from "../../../images/edit-icon.svg";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import { DeleteIcon, EditIcon, MoreVertIcon } from "@mui/icons-material";


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

  const [height, setHeight] = useState("300px");

  return (
    <Card
      sx={{ maxWidth: "225px", height: height, minHeight: "300px",  overflowWrap:"break-word"  }}
      onClick={() => setHeight(height === "300px" ? "auto" : "300px")}
    >
      <Grid container gridColumn={100} xs={{}}>
        { props.category }
        <IconButton aria-label="settings"></IconButton>
      </Grid>

      <CardHeader></CardHeader>
      <Grid>
        <Typography variant="subtitle1" title="Title Name">
          { props.title }
        </Typography>
      </Grid>
      <Divider variant="middle" />
      <CardContent>
        <Typography variant="body2">
          { props.description }
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Note;