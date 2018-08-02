import Search from './models/Search';
import * as sView from './views/searchView';
import Recipe from './models/Recipe';
import {clearLoader, elements as dom, renderLoader} from "./views/base";

const state = {
    globalPage: 1
};

const loadData = async () => {
    sView.clearResults();
    try {
        renderLoader(dom.searchRes);
        await state.search.getResults(state.globalPage);
        clearLoader();
    } catch (e) {
        alert(e);
        clearLoader();
    }
};

const ctrlSearch = async () => {
    const query = sView.getInput();
    if (query) {
        state.search = new Search(query);
        await loadData();
        state.search.result.length ?
            sView.render(state.search.result) :
            alert('No results!');
    }
};

dom.searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    await ctrlSearch();
});

dom.searchPager.addEventListener("click", async e => {
    const btn = e.target.closest('.btn-inline');
    const btnMore = e.target.closest('.btn-inline-more');
    if (btn) {
        const page = parseInt(btn.dataset.goto);
        sView.clearResults();
        sView.render(state.search.result, page);
    } else if (btnMore) {
        const page = parseInt(btnMore.dataset.goto);
        state.globalPage++;
        await loadData();
        window.scrollTo(0, 0);
        sView.render(state.search.result, page);
    }
});

const ctrlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    if (id) {
        state.recipe = new Recipe(id);
        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
        } catch (e) {
            alert(e);
        }
    }
};

["hashchange", "load"].forEach(event => window.addEventListener(event, ctrlRecipe));




