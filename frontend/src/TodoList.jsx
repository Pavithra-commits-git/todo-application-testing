import { useState, useEffect } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const res = await fetch('http://localhost:4000/items');
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    await fetch('http://localhost:4000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    setText('');
    load();
  };

  const edit = async () => {
    await fetch(`http://localhost:4000/items/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    setEditingId(null);
    setText('');
    load();
  };

  const remove = async id => {
    await fetch(`http://localhost:4000/items/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={editingId ? edit : add}>{editingId ? 'Update' : 'Add'}</button>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            {t.text}
            <button onClick={() => { setText(t.text); setEditingId(t.id); }}>Edit</button>
            <button onClick={() => remove(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}