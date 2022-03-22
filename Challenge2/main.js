//API variables
const API_KEY = "api_key=6e226a8aeacf76434cdaeb38fb8a4adf";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL =  BASE_URL + "/discover/movie?sort_by=popularity.desc&adult=false&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

//DOM variables
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

//calling a popular movie URL to turn it into json data
getMovies(API_URL);

//when function is called, it takes the parameter and turns it into json data and then into an array
function getMovies(url) {
    fetch(url).then(response => response.json()).then(data => {
    let results = [];
    for(let i in data.results)
    results.push(data.results [i]);
    console.log(results);  

      showMovies(results);
    })
}

//this function takes the array and transforms it into 
function showMovies(results) {
  main.innerHTML = '';
  
  results.forEach((movie) => {
      const {id, title, overview, poster_path, release_date, vote_average} = movie;
      //console.log(movie);
      //to get the picture, just call functions to call the logo_path in the src and things like that} 
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `<img src="${IMG_URL + poster_path}" alt="${title}">
      <div class="movie-info">
          <h3>${title}</h3>
          <span class="released">${release_date}</span>
          <span class="${getColor(vote_average)}">${vote_average}</span>

      </div class="watch">
      ${getProviders(id)} 
      ${id} <p>View Providers</p>
      <div> 

      </div>
      <div class="overview">
          <h3>Overview</h3>
          ${overview}
      </div>`
    main.appendChild(movieEl);
    });
}

//this function take in a number and returns the class color that it should be
function getColor(vote) {
  if(vote >= 8) {
    return 'green'
  }
  else if (vote >= 5){
    return 'yellow'
  }
  else {
      return 'red'
  }
}

//event listener for typing into the search bar
search.addEventListener('keydown', (event) => {
  const searchTerm = search.value.replaceAll(' ', '+');
  if(searchTerm) {
    getMovies(SEARCH_URL + '&query=' + searchTerm)
  } else {
    getMovies(API_URL);
  }
}, false);

function getProviders(id) {
  fetch(BASE_URL + '/movie/' + id + '/watch/providers?' + API_KEY)
  .then(response => response.json()).then(providerData => {
    //console.log(providerData.results.US.flatrate[0].provider_name);
    //console.log(providerData.results.US);
    let providers = [];
    for(let i in providerData.results.US)
    providers.push(providerData.results.US);
    

    const flatrate = providers[0].flatrate;
    //console.log(flatrate.length);
    console.log(flatrate);
    const rent = providers[0].rent;
    const buy = providers[0].buy;

    if(flatrate.length > 0) {
      return `<img src="${IMG_URL + flatrate[0].logo_path}" alt="">`;
    }


  })

}