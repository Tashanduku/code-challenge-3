const baseURL = "http://localhost:3000/films";

// DOM elements
const filmList = document.querySelector("#films");
const filmPoster = document.querySelector("#poster");
const filmTitle = document.querySelector("#title");
const filmRuntime = document.querySelector("#runtime");
const filmShowtime = document.querySelector("#showtime");
const filmDescription = document.querySelector("#description");
const filmTickets = document.querySelector("#tickets");
const buyTicketButton = document.querySelector("#buy-ticket");

//fetch and display all movies
function fetchAllMovies() {
  fetch(baseURL)
    .then((response) => response.json())
    .then((movies) => {
      filmList.innerHTML = ""; // Clear the placeholder
      movies.forEach((movie) => {
        const movieItem = document.createElement("li");
        movieItem.textContent = movie.title;
        movieItem.classList.add("film", "item");
        if (movie.capacity - movie.tickets_sold === 0) {
          movieItem.classList.add("sold-out");
        }
        movieItem.addEventListener("click", () => displayMovieDetails(movie));
        filmList.appendChild(movieItem);
      });
    })
    .catch((error) => console.error("Error fetching movies:", error));
}