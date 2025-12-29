import axios from "axios";

const TodoTable = ({ todos = [], getAllTodoes, setFormData,refreshCompleted }) => {
  const deleteTodoes = async (id) => {
    await axios.delete(`https://todo-backend-blond-seven.vercel.app/web/api/todo/delete/${id}`);
    getAllTodoes();
  };

  const upDateTodoes = (todo) => {
    setFormData({
      ...todo,
      sDate: todo.sDate?.split("T")[0],
      eDate: todo.eDate?.split("T")[0],
    });
  };

  const completeTodo = async (id) => {
    await axios.put(`https://todo-backend-blond-seven.vercel.app/web/api/todo/complete/${id}`);
    getAllTodoes(); // refresh active list
     refreshCompleted();
  };

  return (
    <div className="col-span-1 md:col-span-2">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="px-6 py-4 text-lg font-semibold bg-gray-100">
          Todos List
        </h2>

        <div className="overflow-auto max-h-[440px]">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                <th className="px-4 py-3">S.No</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Start</th>
                <th className="px-4 py-3">End</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {todos.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No todos available
                  </td>
                </tr>
              ) : (
                todos.map((todo, index) => (
                  <tr key={todo._id}>
                    <td className="px-4 py-3 text-center">{index + 1}</td>
                    <td className="px-4 py-3 text-center">{todo.title}</td>
                    <td className="px-4 py-3 text-center">{todo.des}</td>
                    <td className="px-4 py-3 text-center">
                      {todo.sDate?.split("T")[0]}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {todo.eDate?.split("T")[0]}
                    </td>
                    <td className="px-4 py-3">
                      <div className="grid gap-2">
                        <button
                          onClick={() => completeTodo(todo._id)}
                          className="bg-green-500 text-white py-1 rounded"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => upDateTodoes(todo)}
                          className="bg-yellow-500 text-white py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTodoes(todo._id)}
                          className="bg-red-500 text-white py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                    <hr />
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

export default TodoTable;
