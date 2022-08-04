const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getNotes, addNote } = require("../controllers/noteController");
const router = express.Router({ mergeParams: true });

router.route("/").get(protect, getNotes).post(protect, addNote);

module.exports = router;
