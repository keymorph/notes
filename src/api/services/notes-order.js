import { notes } from "../models/database";

const replaceOrder = async (req, res) => {
  // Database Patch operation
  const noteItemPatchOperation = [
    {
      op: "add", // Add replaces the entire object if it already exists or creates a new one if it doesn't
      path: `/notes_order`,
      value: {
        ordered_notes_id: req.body.orderedNotesID,
        order_by: req.body.orderBy,
      },
    },
  ];

  return notes
    .item(req.headers.user_id, req.headers.user_id)
    .patch(noteItemPatchOperation)
    .then(({ resource: noteItem }) => {
      return res.status(200).json({
        message: "Note order updated successfully",
        notesOrder: noteItem.notes_order,
      });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({
        message: "Database error while updating note order",
      });
    });
};

const notesOrderService = {
  replace: replaceOrder,
};
export default notesOrderService;
