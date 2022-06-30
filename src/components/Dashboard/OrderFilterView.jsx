import { Card, Divider, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import FilterView from "./OrderFilterView/FilterView";
import OrderView from "./OrderFilterView/OrderView";

export default function OrderFilterView({
  categoriesCollection,
  filterCategories,
  notesOrder,
  setFilterCategories,
  setNotesOrder,
}) {
  //#region Hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  //#endregion

  return (
    <motion.div
      initial={{ opacity: 0, y: "-2rem" }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "1rem",
          borderRadius: "0",
          px: "1rem",
          pt: "0.5rem",
          pb: "1rem",
        }}
      >
        <OrderView
          notesOrder={notesOrder}
          setNotesOrder={setNotesOrder}
          isMobile={isMobile}
        />
        <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />
        <FilterView
          categoriesCollection={categoriesCollection}
          filterCategories={filterCategories}
          setFilterCategories={setFilterCategories}
          isMobile={isMobile}
        />
      </Card>
    </motion.div>
  );
}
