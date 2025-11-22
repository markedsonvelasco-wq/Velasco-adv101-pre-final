
import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Sample initial data matching your screenshot
  useEffect(() => {
    const sampleTodos = [
      {
        id: 1700445601,
        title: "Grocery Shopping",
        description: "Pick up milk, eggs, cheese, and fresh produce from the market.",
        completed: true,
        date: "November 20, 2025 09:23 PM"
      },
      {
        id: 1700445602,
        title: "Pay Utility Bills",
        description: "Ensure electricity and internet bills are paid before the due date (Friday).",
        completed: true,
        date: "November 20, 2025 09:23 PM"
      },
      {
        id: 1700445603,
        title: "Call Mom",
        description: "Check in and finalize plans for the upcoming holiday weekend.",
        completed: true,
        date: "November 20, 2025 09:23 PM"
      },
      {
        id: 1700445604,
        title: "Car Wash",
        description: "Take the car to the wash and check the tire pressure.",
        completed: true,
        date: "November 20, 2025 09:23 PM"
      },
      {
        id: 1700445605,
        title: "Book Appointment",
        description: "Schedule the annual physical check-up with Dr. Peterson.",
        completed: true,
        date: "November 20, 2025 09:23 PM"
      }
    ];
    setTodos(sampleTodos);
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title,
      description,
      completed: false,
      date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };

    setTodos([...todos, newTodo]);
    setTitle("");
    setDescription("");
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { 
        ...todo, 
        completed: !todo.completed,
        date: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const saveEdit = (id) => {
    if (!editTitle.trim()) return;

    setTodos(todos.map(todo => 
      todo.id === id ? { 
        ...todo, 
        title: editTitle,
        description: editDescription,
        date: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      } : todo
    ));

    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-50 py-8 font-sans`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Todo Application</h1>
          <p className="text-gray-600">Manage your daily tasks efficiently</p>
        </div>

        {/* Add Todo Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Todo</h2>
          <form onSubmit={addTodo} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter todo title"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter todo description"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Todo
            </button>
          </form>
        </div>

        {/* Todo Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Todo List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Created/Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {todos.map((todo) => (
                  <tr key={todo.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === todo.id ? (
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      ) : (
                        <div className={`text-sm font-medium ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                          {todo.title}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === todo.id ? (
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          rows="2"
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      ) : (
                        <div className={`text-sm ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-500'} max-w-xs`}>
                          {todo.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{todo.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {editingId === todo.id ? (
                        <>
                          <button
                            onClick={() => saveEdit(todo.id)}
                            className="text-green-600 hover:text-green-900 focus:outline-none"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(todo)}
                            className="text-blue-600 hover:text-blue-900 focus:outline-none"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="text-red-600 hover:text-red-900 focus:outline-none"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Todos</h3>
            <p className="text-2xl font-bold text-blue-600">{todos.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Completed</h3>
            <p className="text-2xl font-bold text-green-600">
              {todos.filter(todo => todo.completed).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}