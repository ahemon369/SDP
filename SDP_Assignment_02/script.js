const API_SEARCH = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const API_LOOKUP = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const drinksGrid = document.getElementById("drinksGrid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const cartCountEl = document.getElementById("cartCount");
const cartBody = document.getElementById("cartBody");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const closeModalBtn = document.getElementById("closeModal");

let cart = [];
let currentDrinks = [];

window.addEventListener("load", () => loadAndShow("margarita"));
searchBtn.addEventListener("click", () => {
  const q = searchInput.value.trim();
  if(!q) return loadAndShow('margarita');
  loadAndShow(q);
});

searchInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter") searchBtn.click();
});


async function loadAndShow(query){
  try{
    const res = await fetch(API_SEARCH + encodeURIComponent(query));
    const js = await res.json();
    if(!js.drinks){
      drinksGrid.innerHTML = `<div class="notfound"><h3>Your searched drink not found 😢</h3></div>`;
      currentDrinks = [];
      return;
    }
    currentDrinks = js.drinks.slice(0, 12);
    renderGrid();
  }catch(err){
    drinksGrid.innerHTML = `<div class="notfound"><h3>Something went wrong. Try again.</h3></div>`;
    console.error(err);
  }
}

function renderGrid(){
  drinksGrid.innerHTML = "";
  currentDrinks.forEach(d => {
    const card = document.createElement("div");
    card.className = "drink-card";
    card.innerHTML = `
      <img src="${d.strDrinkThumb}" alt="${escapeHtml(d.strDrink)}" loading="lazy">
      <h4>${escapeHtml(d.strDrink)}</h4>
      <div class="drink-meta"><strong>Category:</strong> ${escapeHtml(d.strCategory || "")}</div>
      <div class="drink-meta">${escapeHtml((d.strInstructions||"").slice(0,15))}...</div>
      <div class="card-actions">
        <button class="btn add" data-id="${d.idDrink}">Add to Group</button>
        <button class="btn details" data-id="${d.idDrink}">Details</button>
      </div>
    `;

    drinksGrid.appendChild(card);
  });

  document.querySelectorAll(".btn.add").forEach(btn => {
    const id = btn.getAttribute("data-id");
    btn.disabled = false;
    btn.classList.remove("disabled");
    btn.textContent = "Add to Group";
    if(cart.some(item => item.idDrink === id)){
      btn.textContent = "Already Selected";
      btn.disabled = true;
      btn.classList.add("disabled");
    }
    btn.onclick = () => handleAdd(id, btn);
  });

  document.querySelectorAll(".btn.details").forEach(btn => {
    const id = btn.getAttribute("data-id");
    btn.onclick = () => showDetails(id);
  });
}

function handleAdd(id, btn){
  if(cart.length >= 7){
    alert("You have reached the max limit!");
    return;
  }

  let drink = currentDrinks.find(x => x.idDrink === id);
  if(!drink){

    fetch(API_LOOKUP + id).then(r=>r.json()).then(js=>{
      if(js.drinks && js.drinks[0]){
        cart.push(js.drinks[0]);
        updateCartUI();
        btn.textContent = "Already Selected";
        btn.disabled = true;
        btn.classList.add("disabled");
      }
    });
    return;
  }

  if(cart.some(x => x.idDrink === id)){
    return;
  }
  cart.push(drink);
  updateCartUI();
  btn.textContent = "Already Selected";
  btn.disabled = true;
  btn.classList.add("disabled");
}

function updateCartUI(){
  cartCountEl.textContent = cart.length;
  cartBody.innerHTML = "";
  cart.forEach((d, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${i+1}</td><td><img src="${d.strDrinkThumb}" alt=""></td><td>${escapeHtml(d.strDrink)}</td>`;
    cartBody.appendChild(tr);
  });
}

async function showDetails(id){
  try{
    const res = await fetch(API_LOOKUP + id);
    const js = await res.json();
    if(!js.drinks) return;
    const d = js.drinks[0];
    modal.style.display = "flex";
    modalContent.innerHTML = `
      <h2>${escapeHtml(d.strDrink)}</h2>
      <img src="${d.strDrinkThumb}" alt="${escapeHtml(d.strDrink)}">
      <p><strong>Category:</strong> ${escapeHtml(d.strCategory || "")}</p>
      <p><strong>Glass:</strong> ${escapeHtml(d.strGlass || "")}</p>
      <p><strong>Alcoholic:</strong> ${escapeHtml(d.strAlcoholic || "")}</p>
      <p><strong>Instructions:</strong> ${escapeHtml(d.strInstructions || "")}</p>
      <p><strong>Drink ID:</strong> ${escapeHtml(d.idDrink)}</p>
    `;
  }catch(e){console.error(e)}
}

closeModalBtn.addEventListener("click", () => modal.style.display = "none");
modal.addEventListener("click", (e)=>{ if(e.target === modal) modal.style.display = "none"; });

function escapeHtml(s){ return String(s||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"); }

