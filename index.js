
const input = document.getElementById('input');
const select = document.getElementById('select');
const error = document.getElementById('error');
const tableBody = document.getElementById('guestTable').querySelector('tbody');
const form = document.getElementById('form');

document.addEventListener("DOMContentLoaded", loadSavedGuestList);
form.addEventListener("submit", addGuest);

function addGuest(event) {
  event.preventDefault();
  const name = input.value.trim();
  const category = select.value;

  if (name === "" || category === "select") {
    return error.textContent = "Please fill the whole form.";
  }

  if (tableBody.querySelectorAll('tr').length >= 10) {
    return error.textContent = "The guest list is full.";
  }

  const savedGuests = JSON.parse(localStorage.getItem('guestList') || '[]');
  if (savedGuests.some(g => g.name.toLowerCase() === name.toLowerCase())) {
    return error.textContent = "The guest is already on the list.";
  }

  const now = new Date();
  const time = now.toLocaleString();
  const guest = { name, category, time, rsvp: "Not-Attending" };

  savedGuests.push(guest);
  localStorage.setItem("guestList", JSON.stringify(savedGuests));

  renderGuestRow(guest);
  form.reset();
  error.textContent = "";
}

function renderGuestRow({ name, category, time, rsvp }) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td class="changeName">${name}</td>
    <td class="category ${category.toLowerCase()}">${category}</td>
    <td>${time}</td>
    <td><button class="rsvp-btn ${rsvp === "Attending" ? "Attending" : ""}">${rsvp}</button></td>
    <td><button class="edit">Edit</button></td>
    <td class="remove-btn">🗑️</td>
  `;
  tableBody.appendChild(row);

  const rsvpButton = row.querySelector(".rsvp-btn");
  rsvpButton.addEventListener("click", function () {
    rsvpButton.classList.toggle("Attending");
    rsvpButton.textContent = rsvpButton.classList.contains("Attending") ? "Attending" : "Not-Attending";
    updateStorageFromDOM();
  });

  const removeButton = row.querySelector(".remove-btn");
  removeButton.addEventListener("click", function () {
    row.remove();
    updateStorageFromDOM();
  });

  const editButton = row.querySelector(".edit");
  editButton.addEventListener("click", function () {
    const nameCell = row.querySelector(".changeName");
    const newName = prompt("Edit guest name", nameCell.textContent);
    if (newName && newName.trim() !== "") {
      nameCell.textContent = newName.trim();
      updateStorageFromDOM();
    }
  });
}

function loadSavedGuestList() {
  const savedGuests = JSON.parse(localStorage.getItem('guestList') || '[]');
  savedGuests.forEach(guest => renderGuestRow(guest));
}

function updateStorageFromDOM() {
  const guests = Array.from(tableBody.querySelectorAll("tr")).map(row => ({
    name: row.querySelector(".changeName").textContent,
    category: row.querySelector(".category").textContent,
    time: row.children[2].textContent,
    rsvp: row.querySelector(".rsvp-btn").textContent
  }));
  localStorage.setItem("guestList", JSON.stringify(guests));
}
