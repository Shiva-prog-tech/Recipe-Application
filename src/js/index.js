// import str from './models/Search';

// //~ 1st way to named import
// import {add, mul, Id} from './views/searchView';
// console.log(`conformed ${add(Id,3)} multiplication ${mul(2,3)}  and the string ${str}` );

//~ 2nd way to named import
// import {add as a, mul as m, Id as i} from './views/searchView';
// console.log(`conformed ${a(i,3)} multiplication ${m(2,3)}  and the string ${str}` );

//~ 3rd way to named import
// import * as searchs from './views/searchView';
// console.log(`conformed ${searchs.add(searchs.Id,3)} multiplication ${searchs.mul(2,3)}  and the string ${str}` );

// ~ useing the featch method accessing the reciery detailes
// ~ but in the featch method it not work in the old broweser so in this project i used the axios it will work on the all the browser
// async function recipe(query){
//     try {
//         const key="bd0a237de1mshcd678edf64d52c8p1b9bc2jsndfed8e07b068"
//         const response = await fetch(`https://forkify-api.herokuapp.com/api/search?key=${key}&q=${query}`);
//         const result = await response.json();
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//     }

// }
// recipe( "pasta");
import Recipe from "./models/Recipe";
import Search from "./models/Search";
import List from "./models/List";
import { element, renderLoader, clearLoader } from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";

// import { renderResults } from './views/searchView';
// import { clearInput } from './views/searchView';

// console.log(search);

//~gobal state of the object
//~ * search object
// ~ * current recipe object
// ~ * shopping list object
// ~  * liked recipes

const state = {};
window.state=state;

// ~ search controller model
const controlSearch = async () => {
  // ~ 1) get query from the view
  const query = searchView.getInput();
  // const query = "pizza";
  if (query) {
    //~ 2) new search object and add to state
    state.search = new Search(query);

    // ~ 3) prepare UI for the results
    searchView.clearInput();
    searchView.clearResult();
    renderLoader(element.searchRes[0]);
    try {
      //~ 4) search for recipes

      await state.search.getRecipe();

      // ~5) render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
      console.log(state.search.result);
    } catch (err) {
      alert("somethig wrong with the search...");
      clearLoader();
    }
  }
};

element.searchForm.addEventListener("click", (e) => {
  e.preventDefault();
  controlSearch();
});

// // testing perpose
// window.addEventListener("load", (e) => {
//   e.preventDefault();
//   controlSearch();
// });

element.searchResPages[0].addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    // console.log(goToPage);
    searchView.clearResult();
    searchView.renderResults(state.search.result, goToPage);
  }
});

// ~recipe model
const controlRecipe = async () => {
  const id = window.location.hash.replace("#", "");
  console.log(id);
  if (id) {
    //~ 1) prepare UI for Changes
    recipeView.clearResult();
    renderLoader(element.recipe[0]);

    //~highlight Selected Search Item
    if(state.search) searchView.highlightSelected(id);

    //~ 2) create new recipe Object
    state.recipe = new Recipe(id);
    // window.r=state.recipe;
    try {
      //~ 3) get recipe data
      await state.recipe.getRecipe();
      // console.log(state.recipe.ingredients);
      state.recipe.parseIngredients();

      //~ 4) calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
      //~ 5) render recipe
      clearLoader();
      
      recipeView.renderRecipe(state.recipe)
      console.log(state.recipe);
      // console.log(state.recipe.ingredients);
    } catch (err) {
      alert(`error processing recipe!
      ${err}`);
      
    }
  }
};


// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);
//~ or

["hashchange","load"].forEach(event=>window.addEventListener(event,controlRecipe));

// ~list Control model

const controlList=()=>{
// create new list if there is none yet

if(!state.list) state.list=new List();

// add each ingredient to the list and Ui

state.recipe.ingredients.forEach(el=>{
  const item=state.list.addItem(el.count, el.unit, el.ingredient);
  listView.renderItem(item);
});
}

//~ handdle the delete and update list iteam events

element.shopping[0].addEventListener('click',e=>{
  const id= e.target.closest('.shopping__item').dataset.itemid;

  if(e.target.matches('.shopping__delete, .shopping__delete *')){
    //delete freom state
    state.list.deleteItem(id);

    //delete from ui
    listView.deleteItem(id);
  }
  else if(e.target.matches('.shopping__count-value')){
    const val=parseFloat(e.target.value,10);
    state.list.updateCount(id, val);
  }
});

//~controll like model

// const controlLike=()=>{
//   if(!state.likes) state.likes=new Like();
//   const currentId

// }



//~ handdaling the recipe button clicks

element.recipe[0].addEventListener('click', e=>{
  if(e.target.matches('.btn-decrease, .btn-decrease *')){
    //drecrease button is clicked 
    state.recipe.updateServings('dec');
    recipeView.updateServingsIngredients(state.recipe);
    
  }
  else if(e.target.matches('.btn-increase, .btn-increase *')){
    //increase button is clicked 
    state.recipe.updateServings('inc'); 
    recipeView.updateServingsIngredients(state.recipe);

  }
  else if(e.target.matches('.recipe_btn--add, .recipe_btn--add *')){
    controlList();
  }
  else if(e.target.matches('.recipe_love, .recipe_love *')){
    controlLike();

  }
  console.log(state.recipe);
})

window.l=new List()