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
      filmList.innerHTML = ""; 
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
//  display movie details
function displayMovieDetails(movie) {
    filmPoster.src = movie.poster;
    filmTitle.textContent = movie.title;
    filmRuntime.textContent = `Runtime: ${movie.runtime} minutes`;
    filmShowtime.textContent = `Showtime: ${movie.showtime}`;
    filmDescription.textContent = movie.description;
    const availableTickets = movie.capacity - movie.tickets_sold;
    filmTickets.textContent = `Available Tickets: ${availableTickets}`;
    buyTicketButton.disabled = availableTickets === 0;
    buyTicketButton.textContent = availableTickets > 0 ? "Buy Ticket" : "Sold Out";
  
    
    buyTicketButton.onclick = () => buyTicket(movie);
  }

//  handle ticket purchase
function buyTicket(movie) {
    const availableTickets = movie.capacity - movie.tickets_sold;
    if (availableTickets > 0) {
      movie.tickets_sold += 1;
      displayMovieDetails(movie);
  
      
      fetch(`${baseURL}/${movie.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tickets_sold: movie.tickets_sold }),
      }).catch((error) => console.error("Error updating tickets:", error));
    }
  }
  
  // Fetch and display the first movie on page load
  function fetchFirstMovie() {
    fetch(`${baseURL}/1`)
      .then((response) => response.json())
      .then((movie) => displayMovieDetails(movie))
      .catch((error) => console.error("Error fetching first movie:", error));
  }
  
  
  fetchAllMovies();
  fetchFirstMovie();