const filterButtons = document.querySelectorAll(".filters button");
const container = document.querySelector(".animal-grid");
const searchInput = document.querySelector(".search");
 
const noResults = document.createElement("p");
noResults.textContent = "Animal not available";
noResults.style.textAlign = "center";
noResults.style.fontWeight = "bold";
noResults.style.display = "none";
container.parentNode.insertBefore(noResults, container.nextSibling);

function showExtensions(data) {
  container.innerHTML = ""; 
  data.forEach(ext => {
    const card = document.createElement("div");
    card.classList.add("animal-card", ext.status);

    card.innerHTML = `
      <h3>${ext.name}</h3>
      <p>${ext.description}</p>
    `;

    container.appendChild(card);
  });
}

let allData = [];
fetch('data.json')
  .then(res => res.json())
  .then(data => {
    allData = data;
    showExtensions(allData);
  })
  .catch(err => console.error(err));

const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  toggle.textContent = isLight ? "🌞 Light Mode" : "🌙 Dark Mode";
});

function filterCards(filter) {
  const cards = container.querySelectorAll(".animal-card");
  let visibleCount = 0;

  cards.forEach(card => {
    if (filter === "all" || card.classList.contains(filter)) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  noResults.style.display = visibleCount === 0 ? "block" : "none";
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.textContent.toLowerCase();
    filterCards(filter);
  });
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  const cards = container.querySelectorAll(".animal-card");
  let visibleCount = 0;

  cards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();

    if (name.includes(query) || description.includes(query)) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  noResults.style.display = visibleCount === 0 ? "block" : "none";
});
