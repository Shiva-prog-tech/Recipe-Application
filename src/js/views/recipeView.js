import { element } from "./base";
import { Fraction } from "fractional";

const fractionalCount=count=>{
  if(count){
    let [int,dec]=count.toString().split('.').map(el=>parseInt(el,10));
    if(!dec) return count;
    if(int===0){
      let fr= new Fraction(count);
      return `${fr.numerator}/${fr.denominator}`;
    }else{
      let fr=new Fraction(count-int);
      return `${int} ${fr.numerator}/${fr.denominator}`;
    }

  }
  return '?';
};

export const clearResult = () => {
    element.recipe[0].innerHTML ="";
    element.recipe[0].innerHTML="";
  };

const createIngredient = ingredient =>`
<li class="recipe_item">
     <svg class="recipe_" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" style="fill: rgba(250, 127, 16, 1);"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z"></path></svg>
        <div class="recipe_count">
            ${fractionalCount(ingredient.count)}
        </div>
        <div class="recipe_ingredient">
        <span class="recipe_unit">${ingredient.unit}</span>
        ${ingredient.ingredient}
        </div>
</li> 
`
export const renderRecipe = recipe =>{
    const markUp = `
    <figure class="recipe_fig">
          <img src="${recipe.img}" alt="${recipe.title}" class="recipe_img">
          
          <h1 class="recipe_title">
            <span>${recipe.title}</span>
          </h1>
        </figure>
        <div class="recipe_detailes">
          <div class="recipe_info">
            <svg class="recipe_info-icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style="fill: rgba(239, 137, 8, 1);"><path d="M12 5c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path><path d="M11 9h2v5h-2zM9 2h6v2H9zm10.293 5.707-2-2 1.414-1.414 2 2z"></path></svg>
          <span class="recipe_info-data recipe_info-data--minutes">${recipe.time}</span>
          <span class="recipe_info-text">Minutes</span>
          </div>
          <div class="recipe_info">
            <svg class="recipe_info-icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style="fill: rgba(250, 127, 16, 1);"><circle cx="12" cy="4" r="2"></circle><path d="M15 22V9h5V7H4v2h5v13h2v-7h2v7z"></path></svg>
            <span class="recipe_info-data recipe_info-data--people">${recipe.servings}</span>
          <span class="recipe_info-text">Servings</span>
          <div class="recipe_info-buttons">
            <button class="btn-tiny btn-decrease">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(250, 127, 16, 1);"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11H7v-2h10v2z"></path></svg>
            </button>
            <button class="btn-tiny btn-increase">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(250, 127, 16, 1);"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
            </button>
            </div>
          </div>
          <button class="recipe_love">
              <svg class="hedder_likes" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" style="fill: rgba(250, 127, 16, 1);"><path d="M12.279 8.833 12 9.112l-.279-.279a2.745 2.745 0 0 0-3.906 0 2.745 2.745 0 0 0 0 3.907L12 16.926l4.186-4.186a2.745 2.745 0 0 0 0-3.907 2.746 2.746 0 0 0-3.907 0z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg>
          </button>
        </div>
        <div class="recipe_ingredients">
          <ul class="recipe_ingredient-list">
            ${recipe.ingredients.map(el=>createIngredient(el)).join('')}
          </ul>
          <button class="btn-small recipe_btn recipe_btn--add">
            <svg class="search_icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style="fill: rgba(250, 127, 16, 1);"><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle><path d="M21 7H7.334L6.18 4.23A1.995 1.995 0 0 0 4.333 3H2v2h2.334l4.743 11.385c.155.372.52.615.923.615h8c.417 0 .79-.259.937-.648l3-8A1.003 1.003 0 0 0 21 7zm-4 6h-2v2h-2v-2h-2v-2h2V9h2v2h2v2z"></path></svg>
            <span>Add to shopping list</span>
          </button>
        </div>
        <div class="recipe_directions">
          
          <h2 class="heading-2">
            How to cook it</h2>
          <div class="recipe_directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe_by">${recipe.author}</span>.please checkout the directions on there websites.

          </div>
          <a class="btn-small recipe_btn" href="${recipe.url}" target="_blank" >
            <span>Directions</span>
            <svg class="search_icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style="fill: rgba(250, 127, 16, 1);"><path d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path></svg>
          </a>
        </div>
        `;
        element.recipe[0].insertAdjacentHTML('afterbegin',markUp);
};

export const updateServingsIngredients=recipe=>{

  //update servings
  document.querySelector('.recipe_info-data--people').textContent=recipe.servings;

  //update ingredients
  const countElements=Array.from(document.querySelectorAll('.recipe_count'))
countElements.forEach((el,i)=>{
  el.textContent=fractionalCount(recipe.ingredients[i].count);
})
}