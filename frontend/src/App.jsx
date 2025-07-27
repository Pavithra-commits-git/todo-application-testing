import React, { useState } from 'react';
import Login from './Login';
import TodoList from './TodoList';

function App() {
  const [token, setToken] = useState(null);
  return token ? <TodoList token={token} /> : <Login onLogin={setToken} />;
}
export default App;