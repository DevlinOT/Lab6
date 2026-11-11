
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/movies', (req, res)=>{
    console.log(req.body);
    res.send("Movie Added:", req.body.title);
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/api/movies', (req, res) => {
  const movies = [
    {
      Title: "Avengers: Infinity War (server)",
      Year: "2018",
      imdbID: "tt4154756",
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

  res.json({ movies });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
