import { useState, useMemo } from "react";
import { useBooksContext } from "../hooks/useBooksContext";
import BookDetails from "../components/BookDetails";

const SearchPage = () => {
  const { books } = useBooksContext();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return (books || []).filter((b) => {
      const text = [b?.title, b?.autor, b?.status]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return text.includes(q);
    });
  }, [books, query]);

  return (
    <div className="search-page">
      <h2>Die Büchersuche kann starten:</h2>

      <div className="searchbar">
        <input
          type="text"
          placeholder="Titel, Autor*in oder Status eingeben…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buchsuche"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Suche löschen"
          >
            Löschen
          </button>
        )}
      </div>

      {query && (
        <p className="search-meta">
          {filtered.length} {filtered.length === 1 ? "Treffer" : "Treffer"}
        </p>
      )}

      {/* Anzeige der gefundenen bücher */}
      <div className="search-results">
        {filtered.length > 0 &&
          filtered.map((book) => <BookDetails key={book._id} book={book} />)}
      </div>
    </div>
  );
};

export default SearchPage;
