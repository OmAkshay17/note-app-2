// client/src/App.js
import React, { useState } from 'react';
import NoteList from './components/NoteList';
import AddNote from './components/AddNote';
import Login from './components/login';
import Register from './components/Register';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => setLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <div>
      <h1>Notes App</h1>
      {loggedIn ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <AddNote />
          <NoteList />
        </>
      ) : (
        <>
          <Login onLogin={handleLogin} />
          <Register />
        </>
      )}
    </div>
  );
};

export default App;
