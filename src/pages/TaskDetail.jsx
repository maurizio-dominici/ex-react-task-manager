import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../contex/GlobalContext";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask } = useContext(GlobalContext);

  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    return <h2>Task non trovata</h2>;
  }

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert(`Task ${task.id} eliminata con successo!!`);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <h1>Pagina di dettaglio</h1>
      <p className="p-detail">
        <strong>Titolo : </strong>
        {task.title}
      </p>
      <p className="p-detail">
        <strong>Descrizione : </strong>
        {task.description}
      </p>
      <p className="p-detail">
        <strong>Stato : </strong>
        {task.status}
      </p>
      <p className="p-detail">
        {new Date(task.createdAt).toLocaleDateString()}
      </p>
      <button onClick={handleDelete} className="remove-button">
        Rimuovi Task
      </button>
    </>
  );
}
