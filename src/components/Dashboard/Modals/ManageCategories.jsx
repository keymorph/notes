import { Card, Grow, Modal, Typography } from "@mui/material";
import { modalCard } from "../../../styles/components/modals/modal";

export default function ManageCategories({
  modalOpen,
  handleModalClose,
  categoriesCollection,
  setCategoriesCollection,
}) {
  return (
    <Modal open={modalOpen} onClose={handleModalClose} closeAfterTransition>
      <Grow in={modalOpen}>
        <Card sx={modalCard}>
          <Typography variant="h5" color={"primary"}>
            Manage Categories
          </Typography>
        </Card>
      </Grow>
    </Modal>
  );
}
