import {elements as dom} from "./base";

export const getInput = () => dom.searchInput.value;

export const clearResults = () => {
    dom.searchResList.innerHTML = '';
    dom.searchPager.innerHTML = ''
};

const limitTitleLength = (title, limit = 22) => {
    return title.length > limit ?
        title.substring(0, title.substring(0, limit).lastIndexOf(' ')) + '...' :
        title;
};
/**
 * @param r
 * @param {{recipe_id:string}} r
 * @param {{publisher:string}} r
 * @param {{image_url:string}} r
 * @param {{title:string}} r
 */
const renderRecipe = r => {
    const markup = `
        <li>
            <a class="results__link" href="#${r.recipe_id}">
                <figure class="results__fig">
                    <img src="${r.image_url}" alt="${r.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitTitleLength(r.title)}</h4>
                    <p class="results__author">${r.publisher}</p>
                </div>
            </a>
        </li>
    `;

    dom.searchResList.insertAdjacentHTML('beforeend', markup);
};

const renderButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderMoreButton = page => `
    <button class="btn-inline-more results__btn--next" data-goto=${page + 1}>
        <span>More...</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>
    </button>
`;

const renderPager = (page, amount, perPage, showMore = true) => {
    const pages = Math.ceil(amount / perPage);

    let button;
    if (page === 1 && pages > 1) {
        button = renderButton(page, 'next');
    } else if (page < pages) {
        button = `
            ${renderButton(page, 'prev')}
            ${renderButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        button = `
            ${renderButton(page, 'prev')}
            ${showMore ? renderMoreButton(page) : ""}
        `;
    }

    dom.searchPager.insertAdjacentHTML("beforeend", button);
};

export const render = (recipes, page = 1, perPage = 10) => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    let recipesPage = recipes.slice(start, end);
    recipesPage.forEach(renderRecipe);
    recipesPage.length === perPage ?
        renderPager(page, recipes.length, perPage) :
        renderPager(page, recipes.length, perPage, false);
};


