import axios from "axios";
import { key } from "../config";
export default class Recipe {
  constructor(id) {
    this.id = id;
  }
  async getRecipe() {
    try {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/get?key=${key}&rId=${this.id}`
      );
      console.log(res);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      alert("some thig went wrong...");
    }
  }
  calcTime() {
    //assuming thet we need the 15 minitess of the each 3 ingreadients
    const numIng = this.ingredients.length;
    const periods = numIng / 3;
    this.time = periods * 15;
  }
  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "ponds",
    ];
    const unitShort = ["tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cup", "pond"];

    const newIngredients = this.ingredients.map((el) => {
      //~ 1)Uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitShort[i]);
      });
      //~ 2)remove parantheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      //~ 3)parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(" ");
      const unitIndex = arrIng.findIndex((els) => unitShort.includes(els));
      let objIng;
      if (unitIndex > -1) {
        // ~There is unit
        const arrCount = arrIng.slice(0, unitIndex);
        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace("-", "+"));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join("+"));
        }
        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex+1).join(" "),
        };
      } else if (parseInt(arrIng[0], 10)) {
        //~ No unit is there but 1ST element is the number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: "",
          ingredient: arrIng.slice(1).join(" "),
        };
      } else if (unitIndex === -1) {
        //~ there is no uint and no numer in the first position
        objIng = {
          count: "1",
          unit: "",
          ingredient,
        };
      }

      return objIng;
    });
    this.ingredients = newIngredients;
  }
  
  
// ~ update the servings

updateServings(type){
  //servings
  const newServings= type==='dec' ? this.servings-1 : this.servings+1;

  //ingredients

  this.ingredients.forEach(ing=>{
     ing.count=ing.count*(newServings/this.servings);
  });

 return this.servings=newServings;
}
}


