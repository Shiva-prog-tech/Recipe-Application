import { element } from "./base";

export const renderItem=item=>{
    const markUp=`
    <li class="shopping__item" data-itemid=${item.id}>
    <div class="shopping__count">
    <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
    <p>${item.unit}</p>
    </div>
    <p class="shopping__description">${item.ingredient}</p>
    <button class="shopping__delete btn-tiny">
    <i class="bi bi-trash3"></i>
    </button>
    </li>
    `;
    element.shopping[0].insertAdjacentHTML('beforeend',markUp);
}

export const deleteItem=id=>{
    const item=document.querySelector(`[data-itemid="${id}"]`);
    if(item) item.parentElement.removeChild(item);
}