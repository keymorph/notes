import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { NOTES_ORDER_BY } from "../../../models/note-order";

export default function OrderView({ notesOrder, setNotesOrder, isMobile }) {
  const radioComponent = <Radio size={isMobile ? "small" : "medium"} />;

  const handleOrderChange = (orderBy) => {
    // Since the order is selected and not custom, the ordered notes' id is reset to an empty array
    setNotesOrder({
      orderedNotesID: [],
      orderBy,
    });
  };

  return (
    <Box>
      <Typography variant="h6">Order By:</Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <Box
            display={"flex"}
            flexDirection={isMobile ? "row" : "column"}
            width={isMobile ? "100%" : "max-content"}
            mt={"0.5rem"}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <FormControlLabel
                checked={notesOrder.orderBy === NOTES_ORDER_BY.RECENT}
                onChange={() => handleOrderChange(NOTES_ORDER_BY.RECENT)}
                value={NOTES_ORDER_BY.RECENT}
                control={radioComponent}
                label="Most Recent"
              />
              <FormControlLabel
                checked={notesOrder.orderBy === NOTES_ORDER_BY.OLDEST}
                onChange={() => handleOrderChange(NOTES_ORDER_BY.OLDEST)}
                value={NOTES_ORDER_BY.OLDEST}
                control={radioComponent}
                label="Oldest"
              />
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <FormControlLabel
                checked={notesOrder.orderBy === NOTES_ORDER_BY.CATEGORY_NAME}
                onChange={() => handleOrderChange(NOTES_ORDER_BY.CATEGORY_NAME)}
                value={NOTES_ORDER_BY.CATEGORY_NAME}
                control={radioComponent}
                label="Category Name (A-Z)"
              />
              <FormControlLabel
                checked={notesOrder.orderBy === NOTES_ORDER_BY.NOTE_TITLE}
                onChange={() => handleOrderChange(NOTES_ORDER_BY.NOTE_TITLE)}
                value={NOTES_ORDER_BY.NOTE_TITLE}
                control={radioComponent}
                label="Note Title (A-Z)"
              />
            </Box>
          </Box>
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
