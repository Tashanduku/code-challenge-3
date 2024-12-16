# Flatdango Movie Ticket Application

## Overview

Flatdango is a mini web application that allows users to view and purchase movie tickets The application provides an interactive interface to explore available movies, view their details, and buy tickets.

## Features

### Core Functionality
- View details of the first movie when the page loads
- See a menu of all available movies
- Purchase tickets for available movies
- Real-time ticket availability tracking

### Detailed User Experience
- Display movie poster, title, runtime, showtime, and available tickets
- Prevent ticket purchases when a showing is sold out
- Dynamic update of available tickets after purchase

## Prerequisites

### Technology Stack
- JavaScript
- HTML
- CSS
- JSON Server (for backend data)

### Installation Requirements
1. Web browser
2. Local development server
3. Node.js (recommended)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone git@github.com:Tashanduku/code-challenge-3.git
```

### 2. Install Dependencies
```bash
npm install json-server
```

### 3. Start JSON Server
```bash
json-server --watch db.json
```

### 4. Open the Application
Open the `index.html` file in your preferred web browser.

## Project Structure
```
code-challenge-3
│
├── index.html        # Main application page
├── styles.css        # Styling for the application
├── script.js         # Core application logic
├── db.json           # Local JSON database
└── README.md         # Project documentation
```


## Contact
Natasha Nduku - natashanduku0@gmail.com

