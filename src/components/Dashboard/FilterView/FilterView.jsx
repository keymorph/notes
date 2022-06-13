import { Card, Typography } from "@mui/material";

export default function FilterView({ open }) {
  return open ? (
    <Card sx={{ mt: "1em" }}>
      <Typography variant="h6">Filter By Category</Typography>
    </Card>
  ) : null;
}
