import { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoTable from "./components/TodoTable";
import TodoHistory from "./components/TodoHistory";

const App = () => {
  const [activeTodos, setActiveTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    des: "",
    sDate: "",
    eDate: "",
  });

  // 🔹 Fetch ACTIVE todos
  const getActiveTodos = async () => {
    try {
      const res = await axios.get(
        "/web/api/todo/active"
      );
      setActiveTodos(res.data);
    } catch (err) {
      console.error("Error fetching active todos", err);
    }
  };

  // 🔹 Fetch COMPLETED todos
  const getCompletedTodos = async () => {
    try {
      const res = await axios.get(
        "/web/api/todo/completed"
      );
      setCompletedTodos(res.data);
    } catch (err) {
      console.error("Error fetching completed todos", err);
    }
  };

  useEffect(() => {
    getActiveTodos();
    getCompletedTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navbar */}
      <nav className="bg-black/40 backdrop-blur-md border-b border-purple-500/30 sticky top-0 z-50">
        <div className="max-w-full mx-auto px-4 py-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            ✨ My Todos App
          </h1>
          <p className="text-purple-300/70 text-sm mt-1">Stay organized, stay focused</p>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-full mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TodoForm
            getAllTodoes={getActiveTodos}
            formData={formData}
            setFormData={setFormData}
          />

          <TodoTable
            todos={activeTodos}
            getAllTodoes={getActiveTodos}
            setFormData={setFormData}
            refreshCompleted={getCompletedTodos}
          />

          <TodoHistory
            todos={completedTodos}
            refreshCompleted={getCompletedTodos}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
