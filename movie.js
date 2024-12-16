const jsonFilePath = 'db.json';

// Fetch the movie data from the JSON file and initialize the app
fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (!data || !data.films) {
      throw new Error('Invalid JSON format: Missing "films" key.');
    }
    initializeApp(data.films); 
  })
  .catch(error => {
    console.error('Error fetching the JSON file:', error.message);
  });

// Initialize the application
function initializeApp(films) {
  const filmList = document.querySelector('#films');
  const firstFilm = films.length > 0 ? films[0] : null;

  // Clear existing list (if any)
  filmList.innerHTML = '';

  // Populate the film list menu
  films.forEach(film => {
    const filmItem = document.createElement('li');
    filmItem.textContent = film.title;
    filmItem.className = film.capacity - film.tickets_sold <= 0 ? 'sold-out' : '';
    filmItem.dataset.id = String(film.id); 

    // Display film details when a film is clicked
    filmItem.addEventListener('click', () => displayFilmDetails(film));
    filmList.appendChild(filmItem);
  });

  // Show the first film's details on page load 
  if (firstFilm) {
    displayFilmDetails(firstFilm);
  }
}

// Display film details in the film-details section
function displayFilmDetails(film) {
  const poster = document.querySelector('#poster');
  poster.src = film.poster;
  poster.alt = film.title;

  document.querySelector('#title').textContent = film.title;
  document.querySelector('#runtime').textContent = `Runtime: ${film.runtime}`;
  document.querySelector('#showtime').textContent = `Showtime: ${film.showtime}`;
  document.querySelector('#description').textContent = film.description;

  const availableTickets = film.capacity - film.tickets_sold;
  document.querySelector('#tickets').textContent = `Available Tickets: ${availableTickets}`;

  const buyButton = document.querySelector('#buy-ticket');
  buyButton.disabled = availableTickets <= 0;
  buyButton.textContent = availableTickets <= 0 ? 'Sold Out' : 'Buy Ticket';

  // Add event listener for the "Buy Ticket" button
  buyButton.onclick = () => {
    if (film.capacity - film.tickets_sold > 0) {
      film.tickets_sold += 1;
      displayFilmDetails(film); 
      updateFilmList(film); 
      alert(`Ticket booked for ${film.title}!`);
    } else {
      alert(`Sorry, no tickets available for ${film.title}.`);
    }
  };
}

// Update the film list to reflect ticket changes
function updateFilmList(updatedFilm) {
  const filmItems = document.querySelectorAll('#films li');
  filmItems.forEach(filmItem => {
    if (filmItem.dataset.id === String(updatedFilm.id)) {
      filmItem.className = updatedFilm.capacity - updatedFilm.tickets_sold <= 0 ? 'sold-out' : '';
    }
  }
)
}