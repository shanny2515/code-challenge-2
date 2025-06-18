const input = document.getElementById("input");
const select = document.getElementById("select");
const error = document.getElementById("error");
const tableBody = document.getElementById("guestTable").querySelector("tbody");
const form = document.getElementById("form");

document.addEventListener("DOMContentLoaded", function () {
  const savedGuest = JSON.parse(localStorage.getItem("guestList") || "[]");
  savedGuest.forEach((guests) => renderGuestRow(guests));
});

function savedToLocalStorage() {
  const guests = Array.from(tableBody.querySelectorAll("tr")).map((row) => ({
    name: row.querySelector(".changeName").textContent,
    category: row.querySelector(".category").textContent,
    time: row.children[2].textContent,
    rsvp: row.querySelector(".rsvp-btn").textContent,
  }));
  localStorage.setItem("guestList", JSON.stringify(guests));
}
function renderGuestRow({ name, category, time, rsvp }) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td class = "changeName">${name}</td>
     <td class= "category ${category.toLowerCase()}">${category}</td>
      <td>${time}</td>
       <td>
       <button class="rsvp-btn ${
         rsvp === "Attending" ? "Attending" : ""
       }">${rsvp}</button>

       </td>
       <td>
        <button class="edit">Edit</button>
       </td>
        <td class= "remove-btn">🗑️</td>`;
  tableBody.appendChild(row);
  form.reset();

  const rsvpButton = row.querySelector(".rsvp-btn");
  rsvpButton.addEventListener("click", function () {
    rsvpButton.classList.toggle("Attending");
    rsvpButton.textContent = rsvpButton.classList.contains("Attending")
      ? "Attending"
      : "Not-Attending";
    savedToLocalStorage();
  });

  const removeButton = row.querySelector(".remove-btn");
  removeButton.addEventListener("click", function () {
    row.remove();
    savedToLocalStorage();
  });

  const edit = row.querySelector(".edit");
  const nameCell = row.querySelector(".changeName");
  edit.addEventListener("click", function () {
    const currentName = nameCell.textContent;
    const newName = prompt("Edit guest name ", currentName);
    if (newName && newName.trim() !== "") {
      nameCell.textContent = newName.trim();
      savedToLocalStorage();
    }
  });
  savedToLocalStorage();
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = input.value.trim();
  const category = select.value;
  if (name === "" || category === "select") {
    return (error.textContent = "please fill the whole form");
  }
  if (tableBody.querySelectorAll("tr").length > 10) {
    return (error.textContent = "The guest list is full");
  }
  const existingName = Array.from(
    tableBody.querySelectorAll(".changeName")
  ).map((td) => td.textContent.toLowerCase());
  if (existingName.includes(name.toLowerCase())) {
    return (error.textContent = "The guest is already on the list");
  }
  error.textContent = "";
  const now = new Date();
  const time = now.toLocaleString();
  renderGuestRow({ name, category, time, rsvp: "Not-Attending" });
  savedToLocalStorage();
  form.reset();
});
