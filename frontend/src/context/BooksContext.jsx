import { createContext, useReducer } from "react";

export const BooksContext = createContext();

//Setzt live im Browser die Anpassungen um, ohne das die Seite neu geladen werden muss!
export const booksReducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOKS":
      return {
        books: action.payload,
      };
    case "CREATE_BOOK":
      return {
        books: [action.payload, ...state.books],
      };
    case "DELETE_BOOK":
      return {
        books: state.books.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_BOOK":
      return {
        books: state.books.map((b) =>
          b._id === action.payload._id ? action.payload : b
        ),
      };

    default:
      return state;
  }
};

export const BooksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(booksReducer, {
    books: null,
  });

  return (
    <BooksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BooksContext.Provider>
  );
};
