export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchPager: document.querySelector('.results__pages'),
};

export const elStrings = {
    loader: 'loader',
    prevButton: 'results__btn--prev',
    nextButton: 'results__btn--next'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg> 
        </div>
    `;

    parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elStrings.loader}`);
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
};

