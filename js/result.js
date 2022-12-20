// Query Selectors
let title = document.querySelector('title');
let drinkName = document.querySelector('.drinkName');
let drinkImage = document.querySelector('.drinkImage');
let drinkIng = document.querySelector('.drinkIng');
let drinkInst = document.querySelector('.drinkInst');
let drinkGlass = document.querySelector('.drinkGlass');

// Variables
let queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const drinkNumber = urlParams.get('id');
const fragment = new DocumentFragment();

// Functions
function populateIngredients(drink) {
  let index = 1;
  let ingredientArray = [];
  while (drink['strIngredient' + index]) {
    ingredientArray.push({
      name: drink['strIngredient' + index],
      amount: drink['strMeasure' + index]
        ? drink['strMeasure' + index]
        : `A dash`,
    });
    index++;
  }
  return ingredientArray;
}

function populateInfo() {
  fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkNumber
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const drink = data.drinks[0];
      const ingList = populateIngredients(drink);
      title.innerText = drink.strDrink;
      drinkName.innerText = drink.strDrink;
      drinkImage.src = drink.strDrinkThumb;
      drinkGlass.innerText = drink.strGlass;
      drinkInst.innerText = drink.strInstructions;
      for (let i = 0; i < ingList.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `${ingList[i].amount} of ${ingList[i].name}`;
        fragment.append(li);
        drinkIng.append(fragment);
      }
    });
}

populateInfo();
