import axios from "axios";

const TodoHistory = ({ todos = [], refreshCompleted }) => {
  const deleteTodo = async (delId) => {
    try {
      const res = await axios.delete(
        `https://todo-backend-blond-seven.vercel.app/web/api/todo/delete/${delId}`
      );

      console.log("Deleted Todo:", res.data); 

      refreshCompleted(); // refresh list after delete
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="col-span-1 md:col-span-3">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="px-6 py-4 text-lg font-semibold bg-gray-100">
          Completed Todos
        </h2>

        <div className="overflow-auto max-h-[440px]">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3">Start</th>
                <th className="px-4 py-3">End</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {todos.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No completed todos
                  </td>
                </tr>
              ) : (
                todos.map((todo) => (
                  <tr key={todo._id}>
                    <td className="px-4 py-3">{todo.title}</td>
                    <td className="px-4 py-3">{todo.des}</td>
                    <td className="px-4 py-3">
                      {new Date(todo.sDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(todo.eDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => deleteTodo(todo._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodoHistory;
