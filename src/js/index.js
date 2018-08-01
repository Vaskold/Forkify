import Search from './models/Search';
import * as sView from './views/searchView';
import {clearLoader, elements as dom, renderLoader} from "./views/base";

/** global state
 * search object
 * search page
 * current recipe obj
 * shopping list
 * liked recipes
 * @type {{search}}
 */
const state = {
    globalPage: 1
};

const loadData = async () => {
    sView.clearResults();
    renderLoader(dom.searchRes);
    await state.search.getResults(state.globalPage);
    clearLoader();
};

const ctrlSearch = async () => {
    const query = sView.getInput();
    if (query) {
        state.search = new Search(query);
        await loadData();
        sView.render(state.search.result, state.globalPage);
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
        sView.render(state.search.result, state.globalPage, page);
    } else if (btnMore) {
        const gPage = parseInt(btnMore.dataset.globalPage);
        const page = parseInt(btnMore.dataset.goto);
        state.globalPage++;
        await loadData();
        sView.render(state.search.result, gPage, page);
    }
});




