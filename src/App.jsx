import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    acceptedTerms: false,
  });

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("user-entries")) || [];
    setEntries(storedEntries);
  }, []);

  const isValidDob = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const age = isValidDob(form.dob);
    if (age < 18 || age > 55) {
      alert("Age must be between 18 and 55.");
      return;
    }

    const newEntries = [...entries, form];
    setEntries(newEntries);
    localStorage.setItem("user-entries", JSON.stringify(newEntries));

    setForm({ name: "", email: "", password: "", dob: "", acceptedTerms: false });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Registration Form</h2>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={form.name}
          placeholder="Enter full name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={form.email}
          placeholder="Enter email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={form.password}
          placeholder="Enter password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <label htmlFor="dob">Date of Birth</label>
        <input
          id="dob"
          type="date"
          value={form.dob}
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
          required
        />

        <div className="checkbox-row">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={form.acceptedTerms}
            onChange={(e) => setForm({ ...form, acceptedTerms: e.target.checked })}
            required
          />
          <label htmlFor="acceptTerms">Accept Terms & Conditions</label>
        </div>

        <button type="submit">Submit</button>
      </form>

      <div className="entries-box">
        <h2>Entries</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Dob</th>
              <th>Accepted terms?</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>No entries yet</td>
              </tr>
            ) : (
              entries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td>{entry.password}</td>
                  <td>{entry.dob}</td>
                  <td>{entry.acceptedTerms ? "true" : "false"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
