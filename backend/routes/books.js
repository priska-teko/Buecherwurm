const express = require("express");
const {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookController");

const router = express.Router();

// GET -> alle Bücher abrufen
router.get("/", getBooks);

// GET -> ein einzelnes Buch abrufen
router.get("/:id", getBook);

// POST -> ein neues Buch hinzufügen
router.post("/", createBook);

// DELETE -> ein Buch löschen
router.delete("/:id", deleteBook);

// UPDATE -> ein Buch aktualisieren
router.patch("/:id", updateBook);


module.exports = router;
