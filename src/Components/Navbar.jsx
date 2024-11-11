import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { moviesContext } from "../Pages/MoviesContext";
const Navbar = () => {
  const [val, setValue] = useState("");
  const { setMovies } = useContext(moviesContext);
  const navigate = useNavigate();
  const handleMovies = async () => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=9293d755&s=movie&type=movie`
      );
      // Ensure that you set the data properly if the API returns a list
      if (res.data.Response === "True" && res.data.Search) {
        setMovies(res.data.Search); // Store the array of movies
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSeries = async () => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=9293d755&s=series&type=series`
      );
      // Ensure that you set the data properly if the API returns a list
      if (res.data.Response === "True" && res.data.Search) {
        setMovies(res.data.Search); // Store the array of series
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=9293d755&s=${val}`
      );
      if (res.data.Response === "True" && res.data.Search) {
        setMovies(res.data.Search);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
 
   const handleChange=(e)=>{
    const value = e.target.value;
    if (value === 'option1') {
      handleMovies();
    } else if (value === 'option2') {
      handleSeries();
    }
   }
  useEffect(() => {
    setMovies([]);
  }, []);
  return (
    <div className="container mx-auto flex justify-between items-center bg-yellow-200">
      <div>
        <img className="w-40 h-32" src="https://static.vecteezy.com/system/resources/previews/008/020/964/non_2x/find-movie-logo-vector.jpg" alt="logo" />
       
      </div>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-red-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            onChange={(e) => setValue(e.target.value)}
            className="block w-96 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-red-500 focus:ring-red-500 focus:border-red-500 dark:bg-red-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
            placeholder="Search Your Movie..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-900  font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
      <div className="mr-36 hover:text-green-700 font-extrabold">
        <Link to="/favorite">Favorite</Link>
      </div>
   <div className="relative inline-block w-64">
  <label htmlFor="options" className="block text-sm font-bold text-green-900 mb-1">Pick a type of movie:</label>
  <select id="options" name="options"
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300  sm:text-sm rounded-md"
        onChange={handleChange}
        defaultValue="" >
    <option value="option1" >Movies</option>
    <option value="option2">Series</option>
  </select>
</div>
    </div>
  );
};
export default Navbar;