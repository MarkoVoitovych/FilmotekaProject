import { set, get, remove, clear } from './localStorageUse';
import { renderMarkup } from './renderMarkup';

const libraryGalary=document.querySelector('.gallery--library') 

export let allProducts = null;

function startPage() {
  const test=get('Watched');
  const markup=test
  .map(renderMarkup).join('')
  console.log(markup);

  libraryGalary.innerHTML=markup

}

startPage()






