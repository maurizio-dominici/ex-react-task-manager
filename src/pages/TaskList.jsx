import { useContext } from "react";
import { GlobalContext } from "../contex/GlobalContext";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const value = useContext(GlobalContext);
  const { tasks, setTasks } = value;

  console.log(tasks);

  return (
    <>
      <div className="container">
        <h1>Lista Task</h1>

        <table>
          <thead>
            <tr>
              <td>Nome</td>
              <td>Stato</td>
              <td>Data di creazione</td>
            </tr>
          </thead>
          <tbody>
            {tasks &&
              tasks.map((task) => <TaskRow key={task.id} task={task} />)}
          </tbody>
        </table>
      </div>
    </>
  );
}
