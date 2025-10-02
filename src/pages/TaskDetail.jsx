import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../contex/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);

  const task = tasks.find((task) => task.id === parseInt(id));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleUpdate = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      alert(`Task ${task.id} modificata con successo!!`);
      setShowEditModal(false);
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
      <button
        onClick={() => setShowDeleteModal(true)}
        className="remove-button"
      >
        Rimuovi Task
      </button>
      <button className="update-button" onClick={() => setShowEditModal(true)}>
        Modifica Task
      </button>

      <Modal
        title="Conferma eliminazione"
        content="Sei sicuro di voler eliminare questa task?"
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        confirmText="Elimina"
      />

      <EditTaskModal
        task={task}
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdate}
        confirmText="Modifica"
      />
    </>
  );
}
