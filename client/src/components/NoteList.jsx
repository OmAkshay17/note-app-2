// client/src/components/NoteList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NoteList = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/notes', {
                    headers: { Authorization: localStorage.getItem('token') }
                });
                setNotes(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };
        fetchNotes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/notes/${id}`, {
                headers: { Authorization: localStorage.getItem('token') }
            });
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div>
            <h2>Notes</h2>
            <ul>
                {notes.map(note => (
                    <li key={note._id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <button onClick={() => handleDelete(note._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteList;
