import { useEffect, useState } from 'react';

function App() {
  // State
  const [newItem, setNewItem] = useState();
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem('ITEMS');
    if (localValue == null) {
      return [];
    }

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todos));
  }, [todos]);

  // Helper Functions
  /**
   * Handles the form submission to add a new todo.
   * @param {Event} e - The form event
   */
  function handleSubmit(e) {
    e.preventDefault();
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
  }

  /**
   * Toggles the completed status of a todo item.
   * @param {string} id - The unique identifier of the todo
   * @param {boolean} completed - The new completed status
   */
  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        return todo.id === id ? { ...todo, completed } : todo;
      });
    });
  }

  /**
   * Deletes a todo item from the list
   * @param {string} id - The unique identifier of the todo to delete
   */
  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Please enter a new ToDo item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>

      <ul className="list">
        {todos.length === 0 && 'All caught up!'}
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
