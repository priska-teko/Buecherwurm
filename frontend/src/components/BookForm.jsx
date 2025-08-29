import { useState } from "react";
import { useBooksContext } from "../hooks/useBooksContext";

const BookForm = () => {
  const { dispatch } = useBooksContext();

  const [title, setTitle] = useState("");
  const [autor, setAutor] = useState("");
  const [status, setStatus] = useState("geplant"); // Standardwert
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const book = { title, autor, status };

    const response = await fetch("/api/books", {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setTitle("");
      setAutor("");
      setStatus("geplant");
      dispatch({ type: "CREATE_BOOK", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Neues Buch hinzufügen</h3>

      <label>Buchtitel:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Autor*in:</label>
      <input
        type="text"
        onChange={(e) => setAutor(e.target.value)}
        value={autor}
        className={emptyFields.includes("autor") ? "error" : ""}
      />

      <label>Status:</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className={emptyFields.includes("status") ? "error" : ""}
      >
        <option value="geplant">Geplant</option>
        <option value="lese">Lese</option>
        <option value="gelesen">Gelesen</option>
      </select>

      <button>Buch hinzufügen</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default BookForm;
