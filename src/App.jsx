import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import GlobalProvider from "./contex/GlobalContext";

export default function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <nav>
            <NavLink to={"/"}>Task-list</NavLink>
            <NavLink to={"/add"}>Aggiungi task</NavLink>
          </nav>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}
