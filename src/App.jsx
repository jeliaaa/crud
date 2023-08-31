import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [val, setVal] = useState("");
  const apiKEy = 'dd8XQDhLiLFqrlZCv06U9X_adE0tZY6Vvs3zKgW19bWkLRedWg';
  const addTodo = (todo) => {
    fetch('/api/v1/todos', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKEy}`,
        'Contentr-Type': "application/json"
      },
      body: JSON.stringify([{ todo }])
    }).then(res => {
      if (!res.ok) {
        throw new Error('error has occured')
      }
      return res.json()
    }).then(data => setTodos(prev => [...prev, {
      todo: data.items[0].todo
    }]))
      .catch(err => console.log(err))
  }
  const sub = (e) => {
    e.preventDefault();
    addTodo(val);
  }
  return (
    <div>
      <form onSubmit={sub}>
        <input type="text" onChange={(e) => setVal(e.target.value)} />
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
