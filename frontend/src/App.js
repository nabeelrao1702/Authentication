import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', id: null });

  const API_URL = 'http://localhost:5000/items';

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`${API_URL}/${form.id}`, { name: form.name, description: form.description });
      } else {
        await axios.post(API_URL, { name: form.name, description: form.description });
      }
      setForm({ name: '', description: '', id: null });
      fetchItems();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Handle item deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Handle edit item
  const handleEdit = (item) => {
    setForm({ name: item.name, description: item.description, id: item._id });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
      <div className="container">
        <h1>Simple CRUD App</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
          />
          <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              required
          />
          <button type="submit">{form.id ? 'Update' : 'Add'}</button>
        </form>
        <ul className="item-list">
          {items.map((item) => (
              <li key={item._id} className="item">
            <span>
              <strong>{item.name}:</strong> {item.description}
            </span>
                <div>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default App;
