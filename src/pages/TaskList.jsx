import { useContext } from "react";
import { GlobalContext } from "../contex/GlobalContext";

export default function TaskList() {
  const value = useContext(GlobalContext);
  const { tasks, setTasks } = value;

  console.log(tasks);

  return (
    <>
      <h1>Lista Task</h1>
    </>
  );
}
