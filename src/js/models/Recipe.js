import axios from 'axios';
import {key, proxy} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    /**
     * @namespace data.recipe
     * @returns {Promise<void>}
     */
    async getRecipe() {
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            console.log(res);
            this.title = res.data.recipe.title;
            this.url = res.data.recipe.source_url;
            this.img = res.data.recipe.image_url;
            this.author = res.data.recipe.publisher;
            this.ingredients = res.data.recipe.ingredients;
        } catch (e) {
            alert(e);
        }
    }

    parseIngredients() {
        const long = ["tablespoons", "tablespoon", "ounces", "ounce", "teaspoons", "teaspoon", "cups", "pounds"];
        const short = ['tbsp', "tbsp", "oz", "oz", "tsp", "tsp", "cup", "pound"];

        this.ingredients = this.ingredients.map(el => {
            let ing = el.toLowerCase();
            long.forEach((unit, i) => {
                ing = ing.replace(unit, short[i]);
            });
            ing.replace(/ *\([^)]*\) */g, ' ');

            const arIng = ing.split(' ');
            const uIndex = arIng.findIndex(y => short.includes(y));

            let obIng;
            if (uIndex > -1) {
                const arCount = arIng.slice(0, uIndex);
                let count;
                if (arCount.length === 1) {
                    count = eval(arIng[0].replace('-', '+'));
                } else {
                    count = eval(arIng.slice(0, uIndex).join('+'));
                }

                obIng = {
                    count,
                    unit: arIng[uIndex],
                    ingredient: arIng.slice(uIndex + 1).join(' ')
                }
            } else if (parseInt(arIng[0], 10)) {
                obIng = {
                    count: parseInt(arIng[0], 10),
                    unit: '',
                    ingredient: arIng.slice(1).join(' ')
                }
            } else if (uIndex === -1) {
                obIng = {
                    count: 1,
                    unit: '',
                    ing
                }
            }
        });
    }
}