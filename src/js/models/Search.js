import axios from 'axios';
import {key, proxy} from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
        this.result = [];
    }

    /**
     * @namespace data.recipes
     * @returns {Promise<void>}
     */
    async getResults(page = 1) {
        try {
            const result = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}&page=${page}`);
            this.result = this.result.concat(result.data.recipes);
        } catch (e) {
            alert(e);
        }
    }
}