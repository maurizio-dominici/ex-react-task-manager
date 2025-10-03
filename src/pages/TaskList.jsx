import { useCallback, useContext, useMemo, useState } from "react";
import { GlobalContext } from "../contex/GlobalContext";
import TaskRow from "../components/TaskRow";

// funzione debounce generica

function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

export default function TaskList() {
  const value = useContext(GlobalContext);
  const { tasks, setTasks } = value;

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);

  const [searchQuery, setSearcQuery] = useState("");
  const debouncedSetSearchQuery = useCallback(debounce(setSearcQuery, 500), []);

  const sortIcon = sortOrder === 1 ? `↓` : `↑`;

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  const filteredAndSortedTask = useMemo(() => {
    return [...tasks]
      .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        let comparison;

        if (sortBy === "title") {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === "status") {
          const statusOption = ["To do", "Doing", "Done"];
          comparison =
            statusOption.indexOf(a.status) - statusOption.indexOf(b.status);
        } else if (sortBy === "createdAt") {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          comparison = dateA - dateB;
        }
        return comparison * sortOrder;
      });
  }, [tasks, sortBy, sortOrder, searchQuery]);

  console.log(tasks);

  return (
    <>
      <div className="container">
        <h1>Lista Task</h1>

        <input
          type="text"
          onChange={(e) => debouncedSetSearchQuery(e.target.value)}
          placeholder="Cerca per filtrare..."
        />

        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("title")}>
                Nome {sortBy === "title" && sortIcon}
              </th>
              <th onClick={() => handleSort("status")}>
                Stato {sortBy === "status" && sortIcon}
              </th>
              <th onClick={() => handleSort("createdAt")}>
                Data di creazione {sortBy === "createdAt" && sortIcon}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTask &&
              filteredAndSortedTask.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
