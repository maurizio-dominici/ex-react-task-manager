import { createContext } from "react";
import useTasks from "../customHooks/useTasks";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const taskData = useTasks();

  return (
    <GlobalContext.Provider value={{ ...taskData }}>
      {children}
    </GlobalContext.Provider>
  );
}
