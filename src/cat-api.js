import axios from 'axios';
import { Report } from 'notiflix/build/notiflix-report-aio';
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
let isError = false;

axios.defaults.headers.common['x-api-key'] =
  'api_key=live_9QfUWpkSFuNliF50D0EQF83K1VEOBmyVFL5cCMkNryfoSgvItZysOjouRW7XOFsu';

export function showError() {
  Report.failure(
    'Oops!',
    'Something went wrong! Try reloading the page!',
    'Reload',
    () => {
      location.reload();
    }
  );
}
export function fetchCatByBreed(breedId) {
  fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      loader.classList.toggle('hidden');
      catInfo.classList.add('hidden');
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      const { id } = data[0];
      fetch(`https://api.thecatapi.com/v1/images/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        // .then(response => console.log(response))
        .then(({ url, breeds }) => {
          const { name, description, temperament } = breeds[0];
          const card = `<div class="img-container">
          <img
            src="${url}"
            alt="${name}"
          />
        </div>
        <div class="description">
          <h2 class="card-title">${name}</h2>
          <p class="description">${description}</p>
          <p class="temperament">
            <b>Temperament: </b>${temperament}</p>
        </div>`;
          catInfo.innerHTML = card;
        })
        .catch(error => {
          console.log(error);
          showError();
        });
    })
    .catch(error => {
      catInfo.classList.add('hidden');
      console.log(error);
      isError = true;
      showError();
    })
    .finally(() => {
      loader.classList.toggle('hidden');
      catInfo.classList.toggle('hidden');
      if (isError) {
        catInfo.classList.toggle('hidden');
      }
    });
}
