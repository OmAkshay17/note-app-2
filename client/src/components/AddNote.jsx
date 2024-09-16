// client/src/components/AddNote.js
import React, { useState } from 'react';
import axios from 'axios';

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/notes', { title, content }, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNote;
