import { MoreHoriz } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  styled,
  Typography,
} from "@mui/material";

const NoteCard = styled(Card)({
  touchAction: "none", // Disable browser handling of all touch panning and zooming gestures
  width: "300px",
  minHeight: "300px",
  maxHeight: "400px",
  overflowWrap: "break-word",
  margin: "5px",
  transition: "opacity 0.2s ease-in-out",
  cursor: "move",
});

export default function NoteDragOverlay({
  title,
  description,
  categoryName,
  tags,
  color,
}) {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <NoteCard>
        <Box
          sx={{
            backgroundColor: color ? `category.${color}` : `category.none`,
            display: "flex",
            position: "relative",
          }}
        >
          {/* If category exists, show the name */}
          {categoryName ? (
            <Chip label={categoryName} sx={{ m: 0.5, height: "2em" }} />
          ) : null}

          <IconButton
            aria-label="Note settings"
            sx={{ m: 0.5, ml: "auto", height: "1em" }}
          >
            <MoreHoriz />
          </IconButton>
        </Box>

        <CardContent
          sx={{
            userSelect: "text",
            height: "100%",
            py: 0.5,
            px: 1,
          }}
        >
          <Typography variant="body1" title="Title Name" noWrap>
            {title}
          </Typography>

          <Divider />

          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </NoteCard>
    </Box>
  );
}
