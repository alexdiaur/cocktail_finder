"use strict";const buttonSearch=document.querySelector(".js-search-btn"),cocktailInput=document.querySelector(".js-cocktail-input"),list=document.querySelector(".js-result-list"),listFavs=document.querySelector(".js-favs-list"),resetBtn=document.querySelector(".js-reset-btn");let drinks=[],favorites=[];function resetFav(){localStorage.removeItem("favorites"),cocktailInput.value="",listFavs.innerHTML="",list.innerHTML="",favorites=[]}function handleClickReset(t){t.preventDefault(),resetFav()}function getFavoritesfromLocalStorage(){const t=JSON.parse(localStorage.getItem("favorites"));t&&(favorites=t,renderFavsDrinks())}function setFavoritestoLocalStorage(){localStorage.setItem("favorites",JSON.stringify(favorites))}function renderFavsDrinks(){let t="";if(0===favorites.length||null===favorites)t+="Any fav?'";else for(const e of favorites)t+=`<li class="fav_item_list js_fav_item" id="${e.id}">`,t+=`<h2">${e.name}</h2> <button class="js-delete-btn" id=${e.id}>x</button>`,null===e.img?t+='<img class="drink_img" src="./assets/images/strawberry-cocktail-m.jpg" alt="cocktail-photo">':t+=`<img class="drink_img" src="${e.img}" alt="cocktail-photo">`,t+="</li>";listFavs.innerHTML=t}function handleClickResults(t){const e=t.currentTarget.id,i=drinks.find(t=>t.id===e),s=favorites.findIndex(t=>t.id===e);-1===s?favorites.push(i):favorites.splice(s,1),renderDrinkList(drinks),renderFavsDrinks(),setFavoritestoLocalStorage()}function listenerliResults(){const t=document.querySelectorAll(".js-result");for(const e of t)e.addEventListener("click",handleClickResults)}function renderDrinkList(t){let e="",i="";for(const s of t){i=-1!==favorites.findIndex(t=>t.id===s.id)?"is_fav":"",e+=`<li class="result_item_list js-result ${i}" id="${s.id}">`,null===s.img||void 0===s.img?e+='<img class="drink_img" src="./assets/images/strawberry-cocktail-m.jpg" alt="cocktail-photo"/>':e+=`<img class="drink_img" src="${s.img}" alt= cocktail-photo/>`,e+=`<h2>${s.name}</h2>`,e+="</li>"}list.innerHTML=e,listenerliResults()}function dataFromApi(){const t=cocktailInput.value;fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+t).then(t=>t.json()).then(t=>{drinks=t.drinks.map(t=>({id:t.idDrink,name:t.strDrink,img:t.strDrinkThumb})),renderDrinkList(drinks),setFavoritestoLocalStorage()})}function handleClicKSearchDrink(t){t.preventDefault(),dataFromApi()}resetBtn.addEventListener("click",handleClickReset),buttonSearch.addEventListener("click",handleClicKSearchDrink),getFavoritesfromLocalStorage();