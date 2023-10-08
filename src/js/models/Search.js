// export default "it is the write value";
import axios from "axios";
export default class Search{
    constructor(query){
        this.query=query;
    }
    async getRecipe(){
        try {
            const key="bd0a237de1mshcd678edf64d52c8p1b9bc2jsndfed8e07b068"  
            const res= await axios(`https://forkify-api.herokuapp.com/api/search?key=${key}&q=${this.query}`);
            // const res= await axios(`https://raw.githubusercontent.com/Sachinart/Indian-Recipe-API/master/IndianFoodDataset.csv`);
            this.result=res.data.recipes;
            // console.log(this.result.data.recipes);
        } catch (error) {
            alert("there is the no recipe about this name");
        }
    }
    
}

