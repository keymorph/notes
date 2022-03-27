import express from "express";

const router = express.Router();
import authenticateToken from "../middleware/authenticateToken.js";
import noteController from "../controllers/noteController.js";

// router.use(authenticateToken);

router.post("/note", authenticateToken, noteController.create);

router.get("/note", authenticateToken, noteController.show);

router.put("/note", authenticateToken, noteController.edit);

router.delete("/note", authenticateToken, noteController.remove);

// router.post('/note/category', authenticateToken, categoryController.create)

// router.get('/note/category', authenticateToken, categoryController.show)

// router.put('/note/category', authenticateToken, categoryController.edit)

// router.delete('/note/category', authenticateToken, categoryController.remove)

// Input field checks a locally stored array of categories, pulled from the database with a "getCategories" API call
// Once that entered categories, is compared to that array, and isn't a duplicate, then it's OKAY
// The user is ready to create the note now..
// The user clicks SUBMIT
// - create the category, that the user entered AND return the categoryID of the category created.
// - create note based off of returned categoryID value
// -

export default router;
