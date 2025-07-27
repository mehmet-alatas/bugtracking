import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// App component
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bugs, setBugs] = useState([]);
  const [newBugName, setNewBugName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editBugName, setEditBugName] = useState("");
  const [error, setError] = useState("");

  const API_URL = "http://localhost:3001";

  const handleLogin = async () => {
    setError("");
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setLoggedIn(true);
        fetchBugs();
      } else {
        const data = await response.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Could not connect to server");
    }
  };

  const fetchBugs = async () => {
    try {
      const res = await fetch(`${API_URL}/items`);
      const data = await res.json();
      setBugs(data);
    } catch (err) {
      console.error(err);
      setError("Could not fetch bug list");
    }
  };

  const addBug = async () => {
    if (!newBugName.trim()) return;
    try {
      const res = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newBugName }),
      });
      if (res.ok) {
        const newItem = await res.json();
        setBugs([...bugs, newItem]);
        setNewBugName("");
      } else {
        const data = await res.json();
        setError(data.error || "Could not add bug");
      }
    } catch (err) {
      setError("Could not connect to server");
    }
  };

  const startEdit = (bug) => {
    setEditId(bug.id);
    setEditBugName(bug.name);
  };

  const saveEdit = async (id) => {
    if (!editBugName.trim()) return;
    try {
      const res = await fetch(`${API_URL}/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editBugName }),
      });
      if (res.ok) {
        const updated = await res.json();
        setBugs(bugs.map((bug) => (bug.id === id ? updated : bug)));
        setEditId(null);
        setEditBugName("");
      } else {
        const data = await res.json();
        setError(data.error || "Could not update bug");
      }
    } catch (err) {
      setError("Could not connect to server");
    }
  };

  const deleteBug = async (id) => {
    try {
      const res = await fetch(`${API_URL}/items/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBugs(bugs.filter((bug) => bug.id !== id));
      } else {
        const data = await res.json();
        setError(data.error || "Could not delete");
      }
    } catch (err) {
      setError("Could not connect to server");
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    setBugs([]);
    setError("");
  };

  const bugVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    exit: { opacity: 0, x: -50, scale: 0.95, transition: { duration: 0.3 } },
  };

  return (
    <div className="app-container">
      {!loggedIn ? (
        <div className="login-page">
          <div className="login-card">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="primary-btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      ) : (
        <div className="bug-app">
          <header className="app-header">
            <h1>Bug Tracking System</h1>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </header>
          {error && <p className="error center">{error}</p>}
          <div className="add-bug">
            <input
              type="text"
              placeholder="New bug name..."
              value={newBugName}
              onChange={(e) => setNewBugName(e.target.value)}
            />
            <button className="primary-btn" onClick={addBug}>
              Add
            </button>
          </div>
          <div className="bug-list">
            <AnimatePresence>
              {bugs.map((bug) => (
                <motion.div
                  key={bug.id}
                  className={`bug-card ${editId === bug.id ? "editing" : ""}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={bugVariants}
                  layout
                >
                  {editId === bug.id ? (
                    <div className="edit-container">
                      <input
                        type="text"
                        value={editBugName}
                        onChange={(e) => setEditBugName(e.target.value)}
                      />
                      <div className="action-buttons">
                        <button
                          className="primary-btn"
                          onClick={() => saveEdit(bug.id)}
                        >
                          Save
                        </button>
                        <button
                          className="secondary-btn"
                          onClick={() => {
                            setEditId(null);
                            setEditBugName("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bug-content">
                      <span className="bug-name">{bug.name}</span>
                      <div className="bug-actions">
                        <button
                          className="secondary-btn"
                          onClick={() => startEdit(bug)}
                        >
                          Edit
                        </button>
                        <button
                          className="danger-btn"
                          onClick={() => deleteBug(bug.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
