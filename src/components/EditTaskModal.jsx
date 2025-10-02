import { useRef, useState } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [editTask, setEditTask] = useState(task);
  const editFormRef = useRef();
  const changeEditTask = (key, event) => {
    setEditTask((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const { title, description, status } = editTask;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(editTask);
  };

  return (
    <Modal
      title="Modifica Task"
      content={
        <form ref={editFormRef} onSubmit={handleSubmit}>
          <label>
            Titolo:
            <input
              type="text"
              value={title}
              onChange={(e) => changeEditTask("title", e)}
            />
          </label>

          <label>
            Descrizione:
            <textarea
              value={description}
              onChange={(e) => changeEditTask("description", e)}
            ></textarea>
          </label>
          <label>
            Stato:
            <select
              value={status}
              onChange={(e) => changeEditTask("status", e)}
            >
              {["To do", "Doing", "Done"].map((s, index) => (
                <option key={index} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </form>
      }
      confirmText="Salva"
      show={show}
      onClose={onClose}
      onConfirm={() => editFormRef.current.requestSubmit()}
    />
  );
}
