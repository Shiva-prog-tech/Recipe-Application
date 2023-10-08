export const element = {
searchInput : document.getElementById('search_field'),
searchForm : document.getElementById('search'),
searchResList : document.getElementsByClassName('results_list'),
searchRes : document.getElementsByClassName('result'),
searchResPages : document.getElementsByClassName('results_pages'),
recipe : document.getElementsByClassName('recipe'),
shopping : document.getElementsByClassName('shopping')
}
export const elementStrings={
    loader:'loader'
}

export const renderLoader = parent =>{
    const loader=`
    <div class="${elementStrings.loader}">
                <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 24 24" style="fill: rgba(246, 128, 15, 1);transform: ;msFilter:;"><circle cx="12" cy="20" r="2"></circle><circle cx="12" cy="4" r="2"></circle><circle cx="6.343" cy="17.657" r="2"></circle><circle cx="17.657" cy="6.343" r="2"></circle><circle cx="4" cy="12" r="2.001"></circle><circle cx="20" cy="12" r="2"></circle><circle cx="6.343" cy="6.344" r="2"></circle><circle cx="17.657" cy="17.658" r="2"></circle></svg>
              </div>`;
parent.insertAdjacentHTML('afterbegin',loader);
}

export const clearLoader = () =>{
 const loader= document.querySelector(`.${elementStrings.loader}`);
 if(loader){
    loader.parentElement.removeChild(loader);
 }
}