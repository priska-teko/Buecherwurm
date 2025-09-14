// src/pages/Home.jsx
import { useEffect, useMemo, useState } from "react";
import { useBooksContext } from "../hooks/useBooksContext";

// Components
import BookDetails from "../components/BookDetails";
import BookForm from "../components/BookForm";

const Home = () => {
  const { books, dispatch } = useBooksContext();
  const [statusFilter, setStatusFilter] = useState("alle"); // "alle" | "geplant" | "lese" | "gelesen"

  // Bücher laden
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_BOOKS", payload: json });
      }
    };
    fetchBooks();
  }, [dispatch]);

  // Status zählen
  const counts = useMemo(() => {
    const base = { alle: 0, geplant: 0, lese: 0, gelesen: 0 };
    if (!books) return base;

    const newCounts = books.reduce((acc, book) => {
      const status = (book.status || "").toLowerCase();
      if (acc.hasOwnProperty(status)) {
        acc[status] += 1;
      }
      return acc;
    }, base);

    newCounts.alle = books.length;
    return newCounts;
  }, [books]);

  // Gefilterte Liste
  const filteredBooks = useMemo(() => {
    if (!books) return [];
    if (statusFilter === "alle") return books;
    return books.filter((b) => (b.status || "").toLowerCase() === statusFilter);
  }, [books, statusFilter]);

  return (
    <div className="home">
      <BookForm />
      <div className="books">
        <h3>Meine Bücherliste</h3>
        {/* Filterleiste mit Zählern */}
        <div
          className="filter-bar"
          role="tablist"
          aria-label="Bücher nach Status filtern"
        >
          <button
            type="button"
            className={statusFilter === "alle" ? "active" : ""}
            onClick={() => setStatusFilter("alle")}
            aria-pressed={statusFilter === "alle"}
          >
            Alle <span className="count">{counts.alle}</span>
          </button>
          <button
            type="button"
            className={statusFilter === "geplant" ? "active" : ""}
            onClick={() => setStatusFilter("geplant")}
            aria-pressed={statusFilter === "geplant"}
          >
            Geplant <span className="count">{counts.geplant}</span>
          </button>
          <button
            type="button"
            className={statusFilter === "lese" ? "active" : ""}
            onClick={() => setStatusFilter("lese")}
            aria-pressed={statusFilter === "lese"}
          >
            Lese <span className="count">{counts.lese}</span>
          </button>
          <button
            type="button"
            className={statusFilter === "gelesen" ? "active" : ""}
            onClick={() => setStatusFilter("gelesen")}
            aria-pressed={statusFilter === "gelesen"}
          >
            Gelesen <span className="count">{counts.gelesen}</span>
          </button>
        </div>

        {/* Ergebnisliste */}
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookDetails key={book._id} book={book} />
          ))
        ) : (
          <p>Keine Treffer für diesen Filter.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
