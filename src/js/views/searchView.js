// export const add = (a,b)=> a+b;
// export const mul = (a,b)=> a*b;
// export const Id=23;

import { element } from "./base";

export const getInput = () => element.searchInput.value;

export const clearInput = () => (element.searchInput.value = "");

export const clearResult = () => {
  element.searchResList[0].innerHTML = "";
  element.searchResPages[0].innerHTML="";
};

const limiteRecipeTitle = (title, limite = 17) => {
  const newTitle = [];
  if (title.length > limite) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limite) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")}...`;
  }
  return title;
};

export const highlightSelected=id=>{
  const resultsArr = Array.from(document.querySelectorAll('.results__link'));
  resultsArr.forEach(el=>{
    el.classList.remove('results__link---active');
  })
  document.querySelector(`a[href*="${id}"]`).classList.add('results__link---active');
}

export const renderRecipe = (recipe) => {
  const markUp = `
    <li><a class="results___link results__link---active" href="#${recipe.recipe_id}">
      <figure class="results_fig">
        <img src="${recipe.image_url}" alt="${limiteRecipeTitle(
    recipe.title
  )}" />
      </figure>
      <div class="results_data">
        <h4 class="results_name">${limiteRecipeTitle(recipe.title, 20)}</h4>
        <p class="results_author">${recipe.publisher}</p>
      </div>
    </a>
  </li>`;
  element.searchResList[0].insertAdjacentHTML("beforeend", markUp);
};
const createButton = (page, type) =>
 `
              <button class="btn-inline results_btn--${type}" data-goto=${type ==='prev'? page - 1 : page + 1 }>
              <i class='bx bxs-chevron-${type ==='prev'? 'left' : 'right' }'></i>
              <span>page ${type ==='prev'? page - 1 : page + 1 }</span>
              </button>
`;

export const renderButtons = (page, numOfResults, resPerPage) => {
  const pages = Math.ceil(numOfResults / resPerPage);
  let button;
  if (page === 1 && pages > 1) {
    // ~ only go to next page
    button=createButton(page,'next');
  } else if (page < pages) {
    //~ can go prev page and can go to next page
    button=`${createButton(page,'prev')}
    ${createButton(page,'next')}`;
  } else if (page === pages && pages > 1) {
    //~ only go to the prev page
    button=createButton(page,'prev');
  }
  element.searchResPages[0].insertAdjacentHTML("afterbegin", button);
};
export const renderResults = (recipes, page = 1,resPerPage=9) => {

    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page,recipes.length,resPerPage);
};
