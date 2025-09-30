import { createContext, useEffect, useState } from "react";

const { VITE_API_URL } = import.meta.env;

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${VITE_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobalContext.Provider>
  );
}
