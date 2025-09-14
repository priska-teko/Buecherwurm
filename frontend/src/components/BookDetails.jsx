// src/components/BookDetails.jsx
import { useState } from "react";
import { useBooksContext } from "../hooks/useBooksContext";

const BookDetails = ({ book }) => {
  const { dispatch } = useBooksContext();
  const [saving, setSaving] = useState(false);

  // DELETE -> Buch löschen
  const handleDelete = async () => {
    const response = await fetch("/api/books/" + book._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_BOOK", payload: json });
    } else {
      alert(json.error || "Löschen fehlgeschlagen");
    }
  };

  // PATCH -> einzelne Felder aktualisieren (hier: Status)
  const handlePatch = async (updates) => {
    setSaving(true);
    try {
      const response = await fetch("/api/books/" + book._id, {
        method: "PATCH", // <-- HIER passiert das Update
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Aktualisieren fehlgeschlagen");
      }

      // Falls dein Backend das "alte" Dokument zurückgibt, mergen wir lokal:
      const updated = { ...book, ...updates };
      dispatch({ type: "UPDATE_BOOK", payload: updated });
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="book-details">
      <h4>{book.title}</h4>
      <p>
        <strong>Autor*in </strong>
        {book.autor}
      </p>
      <p>
        <strong>Status </strong>
        {book.status}
      </p>

      {/* Schnell-Buttons zum Status-Ändern */}
      <div className="status-buttons">
        <button
          type="button"
          disabled={saving}
          onClick={() => handlePatch({ status: "geplant" })}
        >
          Geplant
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => handlePatch({ status: "lese" })}
        >
          Lese
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => handlePatch({ status: "gelesen" })}
        >
          Gelesen
        </button>
      </div>

      {/* Delete-Icon bleibt */}
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
};

export default BookDetails;
