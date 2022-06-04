import { Card, Grow, Modal } from "@mui/material";
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
        <Card sx={modalCard}></Card>
      </Grow>
    </Modal>
  );
}
