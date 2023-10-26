//SWIPER

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 19,
  navigation: {
      nextEl: ".button-next",
      prevEl: ".button-prev",
      clickable: true,
    },
});

const swiper1 = new Swiper(".mySwiper1", {
  slidesPerView: 4,
  spaceBetween: 19,
  navigation: {
      nextEl: ".button-next1",
      prevEl: ".button-prev1",
      clickable: true,
    },
});

const swiper2 = new Swiper(".mySwiper2", {
  slidesPerView: 4,
  spaceBetween: 19,
  navigation: {
      nextEl: ".button-next2",
      prevEl: ".button-prev2",
      clickable: true,
    },
});

// API
// DECLARATIONS
        // VARIABLES
  const apiKey = 'api_key=bf3e3d2eedb7630af8db21d12553c7dc'
  const baseUrl = 'https://api.themoviedb.org/3/discover/movie?'
  const apiUrlLatest = baseUrl + 'include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2023-10-26&sort_by=popularity.desc'+ '&' + apiKey
const searchResult = document.querySelector('.all-content')
const imgUrl = 'https://image.tmdb.org/t/p/w500'
const latestWrapper = document.querySelector('.mySwiper1').firstElementChild;
console.log(latestWrapper);
const genreList = [
  {
  id: 28,
  name: "Action"
  },
  {
  id: 12,
  name: "Adventure"
  },
  {
  id: 16,
  name: "Animation"
  },
  {
  id: 35,
  name: "Comedy"
  },
  {
  id: 80,
  name: "Crime"
  },
  {
  id: 99,
  name: "Documentary"
  },
  {
  id: 18,
  name: "Drama"
  },
  {
  id: 10751,
  name: "Family"
  },
  {
  id: 14,
  name: "Fantasy"
  },
  {
  id: 36,
  name: "History"
  },
  {
  id: 27,
  name: "Horror"
  },
  {
  id: 10402,
  name: "Music"
  },
  {
  id: 9648,
  name: "Mystery"
  },
  {
  id: 10749,
  name: "Romance"
  },
  {
  id: 878,
  name: "Science Fiction"
  },
  {
  id: 10770,
  name: "TV Movie"
  },
  {
  id: 53,
  name: "Thriller"
  },
  {
  id: 10752,
  name: "War"
  },
  {
  id: 37,
  name: "Western"
  }
  ]
        // FUNCTIONS

function getMovies(url) {

  fetch(url).then(res => res.json()).then((data) => {
    showMovies(data.results)
  } )
}

function showMovies(data){
  latestWrapper.innerHTML=""
  data.forEach((movie) =>{
    const {title, poster_path, vote_average, release_date} = movie
    const movieEL= document.createElement('div')
    movieEL.classList.add('swiper-slide')
    movieEL.innerHTML=
    `<img src="${imgUrl + poster_path}" alt="${title}">
    <div class="overview">
                                <h2 class="overTitle">${title}</h2>
                                <p class="overDate">${release_date}</p>
                                <p class="overGenre">genres</p>
                                <span><img class="star" src="./assets/img/Star.svg" alt=""></span>
                                <p class="overNote">${vote_average}</p>
                            </div>`
    latestWrapper.appendChild(movieEL);
  })
}

// ACTIONS

// 1. Initialize the result of the search

searchResult.innerHTML=""

// 2. Fetch the API

getMovies(apiUrlLatest)