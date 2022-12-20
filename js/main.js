// Query Selectors
let resultListHeader = document.querySelector('.resultListHeader');
let resultList = document.querySelector('.resultList');
let searchField = document.querySelector('.searchField');
let searchButton = document.querySelector('.searchButton');

// Variables
const fragment = new DocumentFragment();

// Functions
function searchDB() {
  let searchString = searchField.value.toLowerCase();
  if (searchString.length < 1) {
    resultListHeader.innerText = 'You must type something to search!';
  } else {
    fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + searchString
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        populateList(data, searchString);
      })
      .catch((err) => console.log(`Error ${err}`));
  }
}

function populateList(data, searchQuery) {
  resultList.innerHTML = '';
  if (data.drinks.length > 1) {
    resultListHeader.innerText = `There are ${data.drinks.length} results for "${searchQuery}"`;
    for (let item of data.drinks) {
      const li = document.createElement('li');
      li.innerHTML = `<img src="${item.strDrinkThumb}"><a href='result.html?id=${item.idDrink}'>${item.strDrink}</a>`;
      fragment.append(li);
      resultList.append(fragment);
    }
  } else {
    resultListHeader.innerText = `There is one result for "${searchQuery}"`;
    const li = document.createElement('li');
    li.innerHTML = `<img src="${data.drinks[0].strDrinkThumb}"><a href='result.html?id=${data.drinks[0].idDrink}'>${data.drinks[0].strDrink}</a>`;
    fragment.append(li);
    resultList.append(fragment);
  }
}

// Event Listeners
searchButton.addEventListener('click', searchDB);
