import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { detailContext } from "./DetailsContext";
import { moviesContext } from "./MoviesContext";
import { GrFavorite } from "react-icons/gr";
const Home = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { setDetails ,favorite,setFavorite} = useContext(detailContext);
  const {movies,setMovies} = useContext(moviesContext)
  const handleClick = async (Title) => {
    const res = await axios.get(
      `https://www.omdbapi.com/?apikey=9293d755&t=${Title}`
    );
    setDetails(res.data);
    navigate("/details");
  };
  const handlefav=(movie)=>{
   
    const isFavorite = favorite.some((item)=>item.Title===movie.Title)
    if(!isFavorite)
      {
        setFavorite((preval)=>[...preval,movie]);
      }
      else{
        alert(`${movie.Title} is already in your favorites!`)
      }
    navigate("/favorite")
    
  }
  const fetchMovies = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
        const movieRes = await axios.get(
            `https://www.omdbapi.com/?apikey=9293d755&page=${page}&s=movie&type=movie`
          );
          const seriesRes = await axios.get(
            `https://www.omdbapi.com/?apikey=9293d755&page=${page}&s=movie&type=series`
          );
      if(seriesRes.data.Response==="True" && seriesRes.data.Search){
        setMovies((prevMovies)=>[...prevMovies,...seriesRes.data.Search])
        setHasMore(seriesRes.data.Search.length>0)
      }
      
      if (movieRes.data.Response === "True" && movieRes.data.Search) {
        setMovies((prevMovies) => [...prevMovies, ...movieRes.data.Search]);
        setHasMore(movieRes.data.Search.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchMovies();
  }, [page]);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    
    <div className="grid md:grid-cols-4 gap-10 p-4 bg-black">
    {movies.map((movie,index) => (
      <div
        key={index}  
        className="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:shadow duration-300"
      >
        <div onClick={() => handleClick(movie.Title)}>
          {movie.Poster !== "N/A" && (
            <img className="w-72 h-72 rounded-2xl" src={movie.Poster} alt={movie.Title} />
          )}
          <div className="text-center font-serif">
            <h2 className="text-white">{movie.Title}</h2>
            <p className="text-white">Year: {movie.Year}</p>
          </div>
        </div>
        <button className="hover:text-red-700 text-center text-white" onClick={() => handlefav(movie)}>
          <GrFavorite />
        </button>
      </div>
    ))}
    {loading && <p className="text-white">Loading...</p>}
    {!hasMore && !loading && <p className="text-white">No more movies available.</p>}
  </div>
    
  );
};
export default Home;