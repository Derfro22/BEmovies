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
  const baseUrl = 'https://api.themoviedb.org/3'
  const apiUrlLatest = baseUrl + '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2023-10-26&sort_by=popularity.desc'+ '&' + apiKey
const searchResult = document.querySelector('.search-result')
const imgUrl = 'https://image.tmdb.org/t/p/w500'
const latestWrapper = document.querySelector('.mySwiper1').firstElementChild;
const popup = document.querySelector(".popup")
const closePopup = document.querySelector(".close")
const searchForm =document.querySelector(".searchform")
const searchBar = document.querySelector("#searchTitle")
const searchURL= baseUrl +'/search/movie?'+apiKey
const searchWrapper = document.querySelector(".mySwiper").firstElementChild
const labelSearch = document.querySelector(".result-search")
const genresCategories = document.querySelector(".genres-cat")
const genreList = [
  {
  id: 28,
  name: "Action"
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
  id: 18,
  name: "Drama"
  },
  {
  id: 14,
  name: "Fantasy"
  },
  {
  id: 10749,
  name: "Romance"
  },
  ]
        // FUNCTIONS

function getMovies(url) {

  fetch(url).then(res => res.json()).then((data) => {
    showMovies(data.results)
  } )
}
function searchMovies(url) {
  fetch(url).then(res => res.json()).then((data) => {
    showSearchedMovies(data.results)
  } )
}
function showSearchedMovies(data) {
  searchWrapper.innerHTML=""
  
  data.forEach((movie) =>{
    const {title, poster_path, vote_average, release_date, overview} = movie
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
    
    
    searchWrapper.appendChild(movieEL);
    movieEL.addEventListener("click", () => {       
      popup.style.display = "block";
      popup.innerHTML = `
      <div class="popup-container">
      <span  id="closepopup"><img class="close" src="./assets/img/close.svg" alt="close cross"></span>
      <div class="popup-content">
          <img id="popupImage" src="${imgUrl + poster_path}" alt="">
          <div class="popupInfo">
              <h2>${title}</h2>
              <p class="year">${release_date}</p>
              <p class="note"><img src="./assets/img/Star.svg" alt="star" srcset="">${vote_average}</p>
              <p class="genre">Genre</p>
              <p class="description">${overview}
              </p>
              
          </div>
      </div>
  </div>
      `   
    })
    document.addEventListener("click", (e) => {
      if (e.target.matches(".close")){
        // console.log("click");
       popup.style.display = "none";
      }
     })  
  })
  searchResult.style.display = "grid"
}
function showMovies(data){
  latestWrapper.innerHTML=""
  data.forEach((movie) =>{
    const {title, poster_path, vote_average, release_date, overview} = movie
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
    movieEL.addEventListener("click", () => {       
      popup.style.display = "block";
      popup.innerHTML = `
      <div class="popup-container">
      <span  id="closepopup"><img class="close" src="./assets/img/close.svg" alt="close cross"></span>
      <div class="popup-content">
          <img id="popupImage" src="${imgUrl + poster_path}" alt="">
          <div class="popupInfo">
              <h2>${title}</h2>
              <p class="year">${release_date}</p>
              <p class="note"><img src="./assets/img/Star.svg" alt="star" srcset="">${vote_average}</p>
              <p class="genre">Genre</p>
              <p class="description">${overview}
              </p>
              
          </div>
      </div>
  </div>
      `   
    })
    document.addEventListener("click", (e) => {
      if (e.target.matches(".close")){
        // console.log("click");
       popup.style.display = "none";
      }
     })  
  })
  
}

// ACTIONS

// 1. Initialize the result of the search

// searchResult.innerHTML=""

// 2. Fetch the API
searchResult.style.display= "none"
getMovies(apiUrlLatest)

searchForm.addEventListener("submit", (e) => {
  e.preventDefault()
  
  const searchTerm = searchBar.value
  labelSearch.innerHTML = `Results for “${searchTerm}”`
  if (searchTerm){
    searchMovies(searchURL+'&query='+searchTerm)
  }
})
var selectedGenreArray = []
// 3. genres filter
setGenre()
function setGenre(){
  genresCategories.innerHTML = ''
  genreList.forEach((genre) => {
    const t = document.createElement('li')
    t.id= genre.id
    t.innerText = genre.name
    t.addEventListener('click', () => {
      if (selectedGenreArray.length == 0) {
        selectedGenreArray.push(genre.id)
      } else {
          if (selectedGenreArray.includes(genre.id)) {
            selectedGenreArray.forEach((id, idx) => {
              if (id == genre.id){
                selectedGenreArray.splice(idx, 1)
              }
            })
          } else {
            selectedGenreArray.push(genre.id)
          }
      }
      console.log(selectedGenreArray);
      getMovies(apiUrlLatest + '&with_genres=' +encodeURI(selectedGenreArray.join(',')))
    })
    genresCategories.appendChild(t)
  })
  
}











