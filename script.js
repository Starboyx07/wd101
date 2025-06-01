document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const entriesTableBody = document.getElementById("entriesTableBody");

  function getStoredEntries() {
    return JSON.parse(localStorage.getItem("user-entries")) || [];
  }

  function saveEntries(entries) {
    localStorage.setItem("user-entries", JSON.stringify(entries));
  }

  function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  function renderEntries(entries) {
    entriesTableBody.innerHTML = "";
    if (entries.length === 0) {
      entriesTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">No entries yet</td></tr>`;
      return;
    }

    entries.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.acceptedTerms ? "true" : "false"}</td>
      `;
      entriesTableBody.appendChild(row);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTerms = document.getElementById("acceptTerms").checked;

    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
      alert("Age must be between 18 and 55.");
      return;
    }

    const entry = { name, email, password, dob, acceptedTerms };
    const entries = getStoredEntries();
    entries.push(entry);
    saveEntries(entries);
    renderEntries(entries);

    form.reset();
  });

  renderEntries(getStoredEntries());
});
