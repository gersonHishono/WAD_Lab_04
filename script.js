const form = document.getElementById('regForm');
const cards = document.getElementById('cards');
const tbody = document.querySelector('#summary tbody');
const formHeader = document.querySelector('.form-header');

// Add collapsible functionality
formHeader.addEventListener('click', function(e) {
  if (form.classList.contains('collapsed')) {
    form.classList.remove('collapsed');
    form.classList.add('expanded');
  } else {
    form.classList.remove('expanded');
    form.classList.add('collapsed');
  }
});

document.addEventListener('click', function(e) {
  if (!form.contains(e.target) && form.classList.contains('expanded')) {
    form.classList.remove('expanded');
    form.classList.add('collapsed');
  }
});

form.classList.add('collapsed');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const first = document.getElementById('first').value.trim();
  const last = document.getElementById('last').value.trim();
  const email = document.getElementById('email').value.trim();
  const prog = document.getElementById('prog').value;
  const year = document.querySelector('input[name="year"]:checked')?.value || "";
  const photo = document.getElementById('photo').value.trim() || "https://placehold.co/200x120?text=Photo";
  const interests = [...document.querySelectorAll('input[name="interests"]:checked')].map(cb => cb.value);

  if (!first || !last || !email.includes('@') || !prog || !year) {
    alert("Please fill all required fields with valid data.");
    return;
  }

  const fullName = first + " " + last;
  
  // Create card
  const card = document.createElement('div');
  card.className = "card";
  card.innerHTML = `<img src="${photo}" alt="Photo">
    <h3>${fullName}</h3>
    <p>${prog}, Year ${year}</p>
    <p>${interests.join(", ")}</p>
    <button class="remove">Remove</button>`;
  card.querySelector('.remove').onclick = () => { card.remove(); row.remove(); };
  cards.appendChild(card);

  // Create table row
  const row = document.createElement('tr');
  row.innerHTML = `<td>${fullName}</td><td>${email}</td><td>${prog}</td><td>${year}</td><td>${interests.join(", ")}</td><td><button class="remove">Remove</button></td>`;
  row.querySelector('.remove').onclick = () => { row.remove(); card.remove(); };
  tbody.appendChild(row);

  form.reset();
  // Collapse form after submission
  form.classList.remove('expanded');
  form.classList.add('collapsed');
});