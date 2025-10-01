import { useMemo, useRef, useState, useContext } from "react";
import { GlobalContext } from "../contex/GlobalContext";

export default function AddTask() {
  const { addTasks } = useContext(GlobalContext);
  const [taskTitle, setTaskTitle] = useState("");
  const descriptionRef = useRef();
  const statusRef = useRef();
  const arrayOption = ["To do", "Doing", "Done"];
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

  const taskTitleError = useMemo(() => {
    if (!taskTitle.trim()) {
      return "Il titolo non puo essere vuoto ...";
    }
    if ([...taskTitle].some((char) => symbols.includes(char))) {
      return "Il titolo non puo contenere caratteri speciali ...";
    }
    return "";
  }, [taskTitle]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (taskTitleError) {
      return;
    }
    const newTask = {
      title: taskTitle.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    console.log("Task da aggiungere :", newTask);

    try {
      await addTasks(newTask);
      alert("task aggiunta correttamente");
      setTaskTitle("");
      descriptionRef.current.value = "";
      statusRef.current.value = "";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <h1>Aggiungi task</h1>

      {/* form di compilazione dati da aggiungere */}

      <form onSubmit={handleSubmit}>
        <label>
          Titolo task:
          <input
            type="text"
            placeholder="aggiungi titolo..."
            value={taskTitle}
            onChange={(e) => {
              setTaskTitle(e.target.value);
            }}
          />
        </label>
        {taskTitleError && <p style={{ color: "red" }}>{taskTitleError}</p>}
        <label>
          Descrizione Task:
          <textarea
            placeholder="inserisci una descrizione"
            ref={descriptionRef}
          ></textarea>
        </label>
        <label>
          Select:
          <select ref={statusRef} defaultValue="To do">
            {arrayOption.map((opp, i) => (
              <option key={i} value={opp}>
                {opp}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" disabled={taskTitleError}>
          Aggiungi Task
        </button>
      </form>
    </>
  );
}
