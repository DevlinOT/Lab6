// Import the Express framework for building the web server
const express = require('express');

// Create an Express application instance
const app = express();

// Port the server will listen on
const port = 4000;

// Import middleware packages
const cors = require('cors');             // Enables Cross-Origin Resource Sharing
const bodyParser = require('body-parser'); // Parses incoming request bodies

// --- Middleware setup ---

// Parse URL-encoded form data (e.g. from HTML forms) into req.body
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON request bodies into req.body
app.use(bodyParser.json());

// Enable CORS using the cors package (allows requests from other origins)
app.use(cors());

// Manually set CORS headers on every response.
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allowed HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Allowed request headers
  next(); // Pass control to the next middleware/route handler
});

// --- Routes ---

// POST /api/movies - Receives a new movie from the client
app.post('/api/movies', (req, res) => {
  // Log the data sent in the request body to the console
  console.log(req.body);

  // Send a response back to the client.
  res.send("Movie Added:", req.body.title);
});

// GET / - Root route, used as a simple health check
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET /api/movies - Returns a hardcoded list of movies as JSON
app.get('/api/movies', (req, res) => {
  // Sample movie data (in a real app this would come from a database)
  const movies = [
    {
      Title: "Avengers: Infinity War (server)",
      Year: "2018",
      imdbID: "tt4154756",   // IMDb's unique identifier for the movie
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    },
    {
      Title: "Captain America: Civil War (server)",
      Year: "2016",
      imdbID: "tt3498820",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    },
    {
      Title: "World War Z (server)",
      Year: "2013",
      imdbID: "tt0816711",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
    }
  ];

  // Send the movies back wrapped in an object: { movies: [...] }
  res.json({ movies });
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
