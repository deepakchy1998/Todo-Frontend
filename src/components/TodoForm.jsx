import axios from "axios";

const TodoForm = ({ getAllTodoes, formData, setFormData }) => {
  const getValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { _id, ...payload } = formData;

  // Ensure sDate and eDate are in YYYY-MM-DD format
  const formattedPayload = {
    ...payload,
    sDate: formData.sDate, // input type="date" already gives YYYY-MM-DD
    eDate: formData.eDate,
  };

  try {
    if (_id) {
      await axios.put(
        `/web/api/todo/edit/${_id}`,
        formattedPayload
      );
    } else {
      await axios.post(
        "/web/api/todo/insert",
        formattedPayload
      );
    }

    getAllTodoes();
    setFormData({ title: "", des: "", sDate: "", eDate: "" });
  } catch (error) {
    console.error("Todo save/update failed:", error);
  }
};


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { _id, ...payload } = formData;

//     try {
//       if (_id) {
//         await axios.put(
//           `http://localhost:3000/web/api/todo/edit/${_id}`,
//           payload
//         );
//       } else {
//         await axios.post(
//           "http://localhost:3000/web/api/todo/insert",
//           payload
//         );
//       }

//       getAllTodoes();
//       setFormData({ title: "", des: "", sDate: "", eDate: "" });
//     } catch (error) {
//       console.error("Todo save/update failed:", error);
//     }
//   };

  return (
    <div className="col-span-1 rounded-lg">
      <h2 className="px-6 py-4 text-lg font-semibold text-gray-800 bg-gray-100">
        Make Todos
      </h2>

      <form className="bg-white p-8 shadow-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={getValue}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="des"
            value={formData.des}
            onChange={getValue}
            rows="4"
            className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="sDate"
              value={formData.sDate}
              onChange={getValue}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              name="eDate"
              value={formData.eDate}
              onChange={getValue}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md"
        >
          {formData._id ? "Update Todoes" : "Add Todoes"}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
