import { fetchCatByBreed, showError } from './cat-api';
import SlimSelect from 'slim-select';
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');

function addToOptionsList(id, name) {
  const option = document.createElement('option');
  option.textContent = name;
  option.value = id;
  select.append(option);
}

fetch('https://api.thecatapi.com/v1/breeds')
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    data.forEach(({ id, name }) => {
      addToOptionsList(id, name);
    });
    new SlimSelect({
      select: '.breed-select',
    });
    select.classList.toggle('hidden');
  })
  .catch(error => {
    console.log(`Ocurrio un error: ${error}`);
    showError();
  })
  .finally(() => {
    loader.classList.toggle('hidden');
  });

select.addEventListener('change', async () => {
  console.log(select.value);
  fetchCatByBreed(select.value);
});
