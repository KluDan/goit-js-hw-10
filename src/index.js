import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const breedSelect = document.querySelector('.breed-select');
const hero = document.querySelector('.hero_main-block')
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const catPhoto = document.querySelector('.cat-photo')

fetchBreeds().then(renderSelect).catch(showError);

    function renderSelect(data){
      breedSelect.classList.remove('hidden')

      const createBreedOption = ({ id, name }) => {
        return `<option value="${id}">${name}</option>`;
      };
      const listItem = data.map(createBreedOption).join("");
      breedSelect.insertAdjacentHTML("beforeend", listItem);
    }

    breedSelect.addEventListener('change', onChangeOption);

    function onChangeOption(){
      loader.classList.remove('hidden');
      fetchCatByBreed(selectBreedId())
      .then(cat => {
        catInfo.classList.remove('hidden');
        loader.classList.add('hidden');
        hero.classList.add('hidden')

        catInfo.innerHTML = createCatInfo(cat[0].breeds[0], cat[0].url);
      })
      .catch(showError);
    }

    function selectBreedId(){
      return breedSelect.options[breedSelect.selectedIndex].value;
    }

    function createCatInfo({name, temperament, description}, url) {
    
        return `
          <div class="cat-info-container">
            <div class="cat-text">
              <h2>${name}</h2>
              <p>${description}</p>
              <p><span>Temperament:</span> ${temperament}</p> 
            </div>
            <a href="${url}" class="cat-image">
              <img class="cat-photo" src="${url}" alt="${name}">
            </a>
          </div>
        `;
    }
    
    function showError(){
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      breedSelect.classList.add('hidden');
      loader.classList.add('hidden');
    }

    Notify.init({
      width: '400px',
      position: 'center-center',
      closeButton: false,
      fontSize: '24px',
      timeout: 5000
    });
