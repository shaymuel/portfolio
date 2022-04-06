const baseURL = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=6e226a8aeacf76434cdaeb38fb8a4adf';
const imgURL = 'https://image.tmdb.org/t/p/w500';
const discoverURL = baseURL + '/discover/movie?sort_by=popularity.desc&' + apiKey;
const searchURL = baseURL + '/search/movie?' + apiKey;
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const list = document.querySelector('.list');
const tagsElem = document.getElementById('tags');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = '';
let totalPages = 100;

const genres = [{
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

let genreOptions = []
getGenre();

function getGenre() {
  tagsElem.innerHTML = '';
  genres.forEach(genre => {
    const t = document.createElement('div');
    t.classList.add('tag');
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener('click', () => {
      if (genreOptions.length == 0) {
        genreOptions.push(genre.id);
      } else {
        if (genreOptions.includes(genre.id)) {
          genreOptions.forEach((id, idx) => {
            if (id == genre.id) {
              genreOptions.splice(idx, 1);
            }
          })
        } else {
          genreOptions.push(genre.id);
        }
      }
      displayMovies(discoverURL + '&with_genres=' + encodeURI(genreOptions.join(',')))
      highlighted()
    })
    tagsElem.append(t);
  })
}

function highlighted() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.classList.remove('highlight')
  })
  cleared()
  if (genreOptions.length != 0) {
    genreOptions.forEach(id => {
      const hightlightedTag = document.getElementById(id);
      hightlightedTag.classList.add('highlight');
    })
  }

}

function cleared() {
  let cleared = document.getElementById('clear');
  if (cleared) {
    cleared.classList.add('highlight')
  } else {

    let clear = document.createElement('div');
    clear.classList.add('tag', 'highlight');
    clear.id = 'clear';
    clear.innerText = 'Clear x';
    clear.addEventListener('click', () => {
      genreOptions = [];
      getGenre();
      displayMovies(discoverURL);
    })
    tagsElem.append(clear);
  }
}

document.querySelector('.toggleTagMenu').addEventListener('click', () => {
  tagsElem.classList.toggle('hidden');
})

displayMovies(discoverURL);

function displayMovies(url) {
  lastUrl = url;
  fetch(url).then(res => res.json()).then(data => {
    if (data.results.length !== 0) {
      buildMovies(data.results);
      currentPage = data.page;
      nextPage = currentPage + 1;
      prevPage = currentPage - 1;
      totalPages = data.total_pages;
      current.innerText = currentPage;
      if (currentPage <= 1) {
        prev.classList.add('disabled');
        next.classList.remove('disabled')
      } else if (currentPage >= totalPages) {
        prev.classList.remove('disabled');
        next.classList.add('disabled')
      } else {
        prev.classList.remove('disabled');
        next.classList.remove('disabled')
      }

    } else {
      main.innerHTML = `<h2 class="no-results">No Results Found</h2>`
    }

  })

}

function buildMovies(data) {
  main.innerHTML = '';
  data.forEach(movie => {
    const {
      title,
      poster_path,
      vote_average,
      overview,
      id
    } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
             <img src="${poster_path? imgURL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${getOverview(overview)}
                <br/> 
                <button class="know-more" id="${id}">Know More</button
            </div>
        
        `

    main.appendChild(movieEl);

    document.getElementById(id).addEventListener('click', () => {
      videoNav(movie)
    })
  })
}

const overlayContent = document.getElementById('overlay-content');

function videoNav(movie) {
  let id = movie.id;
  fetch(baseURL + '/movie/' + id + '/videos?' + apiKey)
    .then(res => res.json())
    .then(videoData => {
      if (videoData) {
        document.getElementById("videoNav").style.width = "100%";
        if (videoData.results.length > 0) {
          let embed = [];
          videoData.results.forEach((video, idx) => {
            let {
              name,
              key,
              site
            } = video
            if (site == 'YouTube') {
              embed.push(`
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          `)
            }
          })
          let content = `<h2 class="no-results">${movie.original_title}</h2>
        <br/>
        ${embed.join('')}
        <br/>`
          overlayContent.innerHTML = content;
          activeSlide = 0;
          showVideos();
        } else {
          overlayContent.innerHTML = `<h2 class="no-results">No Results Found</h2>`
        }
      }
    })
}

function closeNav() {
  document.getElementById("videoNav").style.width = "0%";
}

let activeSlide = 0;
let totalVideos = 0;

function showVideos() {
  let embedClasses = document.querySelectorAll('.embed');

  totalVideos = embedClasses.length;
  embedClasses.forEach((embedTag, idx) => {
    if (activeSlide == idx) {
      embedTag.classList.add('show')
      embedTag.classList.remove('hide')

    } else {
      embedTag.classList.add('hide');
      embedTag.classList.remove('show')
    }
  })

}

function getColor(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return "orange"
  } else {
    return 'red'
  }
}

function getOverview(overview) {
  if (overview.length > 250) {
    return overview.slice(0, 300) + '...';
  } else {
    return overview;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  genreOptions = [];
  getGenre();
  if (searchTerm) {
    displayMovies(searchURL + '&query=' + searchTerm)
  } else {
    displayMovies(discoverURL);
  }
})

prev.addEventListener('click', () => {
  if (prevPage > 0) {
    pageCall(prevPage);
  }
})

next.addEventListener('click', () => {
  if (nextPage <= totalPages) {
    pageCall(nextPage);
  }
})

function pageCall(page) {
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length - 1].split('=');
  if (key[0] != 'page') {
    let url = lastUrl + '&page=' + page
    displayMovies(url);
  } else {
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length - 1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] + '?' + b
    displayMovies(url);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addInput(search.value);
});

list.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-button')) {
    deleted(event.target.parentElement.getAttribute('data-key'));
  }
  let term = event.target.innerText;
  searchTerm = term.slice(0, term.length - 1);
  displayMovies(searchURL + '&query=' + searchTerm);
  document.getElementById("search").placeholder = searchTerm;
});

function addInput(item) {
  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };
    searchHistory.push(todo);
    toLocalStorage(searchHistory);
    search.value = '';
  }
}

function updateList(searchHistory) {
  list.innerHTML = '';
  searchHistory.forEach(function (item) {
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);
    if (item.completed === true) {
      li.classList.add('checked');
    }
    li.innerHTML = `${item.name}
      <button class="delete-button">X</button>`;
    list.append(li);
  });
}

function toLocalStorage(searchHistory) {
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  updateList(searchHistory);
}

function fromLocalStorage() {
  if (localStorage.getItem('searchHistory')) {
    searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    updateList(searchHistory);
  }
}

function deleted(id) {
  searchHistory = searchHistory.filter(function (item) {
    return item.id != id;
  });
  toLocalStorage(searchHistory);
}

fromLocalStorage();