let navbar = document.querySelector(".header .navbar");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
};

const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "b4f0455e";
const APP_key = "e42c126ef6f229e500dd22a660af5976";
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  countData(data.count);
  generateHTML(data.hits);
  console.log(data);
}

function countData(countResult) {
  if (countResult < 1) {
    return alert("Data Not Found Search Another Recipe");
  }
}

function generateHTML(results) {
  // container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Food Type: ${result.recipe.dishType}</p>
        <p class="list-ingredient">Ingredients: ${
          result.recipe.ingredientLines.length > 10
            ? "<span>To Much Ingredients To Show! Click View Recipe Button To See Full Information</span>"
            : result.recipe.ingredientLines.map((indredient, indexIn) => {
                return `<li class="list-group-item">${indredient}
            </li>`;
              })
        }</p>
      </div>
    `;
  });
  var hasil = generatedHTML.replaceAll(",", "");
  searchResultDiv.innerHTML = hasil;
}
