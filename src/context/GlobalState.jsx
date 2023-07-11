import { useContext, useReducer, createContext, useEffect } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  transactions: [],
};

export const Context = createContext();

export const useGlobalState = () => {
  const context = useContext(Context);
  return context;
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
    let initialData = initialState;

    try {
      const localData = localStorage.getItem("transactions");
      initialData = localData ? JSON.parse(localData) : initialState;
    } catch (error) {
      console.error(
        "Error al analizar el JSON almacenado en localStorage:",
        error
      );
      localStorage.removeItem("transactions"); // Eliminar valor no válido
    }
    return initialData;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state));
  }, [state]);

  const deleteTransaction = (id) =>
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });

  const addTransaction = (transaction) =>
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });

  return (
    <Context.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}>
      {children}
    </Context.Provider>
  );
};
