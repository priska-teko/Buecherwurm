const Book = require("../models/bookModel");
const mongoose = require("mongoose");

// get -> Alle Bücher anzeigen
const getBooks = async (req, res) => {
  const books = await Book.find({}).sort({ createdAt: -1 });

  res.status(200).json(books);
};

// get -> Ein Buch anzeigen
const getBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Es gibt kein solches Buch." });
  }

  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({ error: "Es gibt kein solches Buch." });
  }

  res.status(200).json(book);
};

// create -> Neues Buch hinzufügen
const createBook = async (req, res) => {
  const { title, autor, status } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!autor) {
    emptyFields.push("autor");
  }
  if (!status) {
    emptyFields.push("status");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Bitte alle Felder ausfüllen", emptyFields });
  }

  // add --> Neues Buch in Mongo hinzufügen
  try {
    const book = await Book.create({ title, autor, status });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete -> Buch löschen
const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Es gibt kein solches Buch." });
  }

  const book = await Book.findOneAndDelete({ _id: id });

  if (!book) {
    return res.status(400).json({ error: "Es gibt kein solches Buch." });
  }

  res.status(200).json(book);
};

// update -> Buch anpassen
const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Es gibt kein solches Buch." });
  }

  const book = await Book.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!book) {
    return res.status(400).json({ error: "Es gibt kein solches Buch." });
  }

  res.status(200).json(book);
};


module.exports = {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
};
