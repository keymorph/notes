import { Box, Card, Chip, Typography } from "@mui/material";

export default function FilterView({ open, categoriesCollection }) {
  const categoryChips = categoriesCollection
    .filter((category) => {
      return category.name !== "";
    })
    .map((category) => {
      return (
        <Chip
          key={category.id}
          label={category.name}
          color={"default"}
          variant={"outlined"}
          size={"small"}
          sx={{
            gridRow: "1",
          }}
        />
      );
    });
  // const splitCategories = [
  //   categoryChips.slice(0, Math.ceil(categoryChips.length / 2)),
  //   categoryChips.slice(Math.ceil(categoryChips.length / 2)),
  // ];
  //
  // console.log(splitCategories);

  return open ? (
    <Card sx={{ borderRadius: "0" }}>
      <Typography variant="h6">Filter By Category</Typography>
      {/* Display grid box that has  a maximum of two rows, but can have unlimited columns */}
      <Box
        display="grid"
        gap="2em"
        gridTemplateRows={"auto auto"}
        gridAutoRows={"0"}
      >
        {categoryChips}
      </Box>
    </Card>
  ) : null;
}
