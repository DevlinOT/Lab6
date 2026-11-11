// create.js

// useState lets this component store and update form values
import { useState } from "react";
// axios is an HTTP client used to send the form data to the server
import axios from 'axios';

// Create component: a form for adding a new movie
function Create() {
  // --- State: one piece of state per form field ---
  const [title, setTitle] = useState('');   // Movie title
  const [year, setYear] = useState('');     // Movie release year
  const [poster, setPoster] = useState(''); // URL of the movie poster image

  // Runs when the form is submitted
  const handleSubmit = (e) => {
    // Stop the browser from doing a full page reload on submit
    e.preventDefault();

    // Log the current form values (useful for debugging)
    console.log(title, year, poster);

    // Bundle the form values into a single object to send to the server
    const movie = {
      title: title,
      year: year,
      poster: poster
    };

    // Send the movie to the Express server via a POST request
    axios.post('http://localhost:4000/api/movies', movie)
      // On success, log the server's response
      .then((res) => console.log(res.data))
      // On failure, log the error.
      // BUG: errors from axios don't have a top-level .data property.
      // Use err.response?.data or just err.message instead.
      .catch((err) => console.log(err.data));
  };

  return (
    <div>
      <h2>This is my Create Component.</h2>

      {/* onSubmit calls handleSubmit when the user clicks "Add Movie" or presses Enter */}
      <form onSubmit={handleSubmit}>

        {/* Title input (controlled: value comes from state, changes update state) */}
        <div className="form-group">
          <label>Add Movie Title: </label>
          <input type="text"
            className="form-control"
            value={title}
            onChange={(e) => { setTitle(e.target.value) }}
          />
        </div>

        {/* Year input */}
        <div className="form-group">
          <label>Add Movie Year: </label>
          <input type="text"
            className="form-control"
            value={year}
            onChange={(e) => { setYear(e.target.value) }}
          />
        </div>

        {/* Poster URL input.
            NOTE: the label says "Year" but this field is for the poster. */}
        <div className="form-group">
          <label>Add Movie Year: </label>
          {/* NOTE: <textarea> doesn't use a type attribute, so it can be removed */}
          <textarea type="text"
            className="form-control"
            value={poster}
            onChange={(e) => { setPoster(e.target.value) }}
          />
        </div>

        {/* Submit button: triggers the form's onSubmit */}
        <input type="submit" value="Add Movie" />
      </form>
    </div>
  );
}

// Export the component so it can be imported elsewhere (e.g. in App.js)
export default Create;
