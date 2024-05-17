'use strict'

// const btnSearch = document.querySelector('.search')
// const inputSearch = document.querySelector('.icons__search-input')
// const filmCard = document.querySelector('.film-card')

// async function getFilms() {

//     let url = 'https://api.kinopoisk.dev/v1.4/movie?year=2023&genres.name=криминал';

//     let resp = await fetch(`${url}`, {
//         headers: {
//             'X-API-KEY': '1DAP24W-ASD4WA3-N0R7Q2W-3T3KNFT'
//         }
//     })

//     let filmsJson = await resp.json()
//     let arrFilms = filmsJson.docs

//     let i;

//     for (i in arrFilms) {

//         filmCard.innerHTML += `
//         <img class="film-card__img" src="${arrFilms[i].poster.url}" alt="">
//         <div class="film-card__rating">${arrFilms[i].rating.imdb}</div>
//         <div class="film-card__name">${arrFilms[i].name}</div>
//         `
//         console.log(arrFilms[i])
//     }
// }

// getFilms()

// Выход поля поиска
// btnSearch.addEventListener('click', function() {
//     inputSearch.style.transform = 'translate(-140%, 0)';
// });




