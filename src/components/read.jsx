// read.js

// useEffect runs side effects (like fetching data) after the component renders
// useState stores the list of movies and re-renders the component when it changes
import { useEffect, useState } from "react";
// axios is an HTTP client used to request data from the server
import axios from 'axios';
// Child component that displays the list of movies
import Movies from "./movies";

// Read component: fetches movies from the server and displays them
const Read = () => {
    // State holding the array of movies, starts empty until the data arrives.
    // NOTE: the setter is named setMovie but holds many movies; setMovies would be clearer.
    const [myMovies, setMovie] = useState([]);

    // Runs once, after the first render (the empty [] dependency array means "only on mount")
    useEffect(
        () => {
            // Request the list of movies from the Express server
            axios.get('http://localhost:4000/api/movies')
                .then((response) => {
                    // Log the movies array for debugging
                    console.log(response.data.movies);
                    // Save the movies in state, which triggers a re-render with the data
                    setMovie(response.data.movies);
                })
                // If the request fails (server down, network error, etc.), log the error
                .catch((error) => { console.log(error) });
        }, []
    );

    return (
        <div>
            <h1>Hello from Read component</h1>
            {/* Pass the movies down to the Movies component as a prop called myMovies */}
            <Movies myMovies={myMovies}></Movies>
        </div>
    );
}

// Export the component so it can be used elsewhere (e.g. in App.js)
export default Read;
