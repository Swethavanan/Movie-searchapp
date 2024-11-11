import React, { createContext, useState } from 'react';
 
export const moviesContext = createContext();
const MoviesContext = ({children}) => {
    const[movies,setMovies]=useState([]);
    return (
        <moviesContext.Provider value={{movies, setMovies }}>
            {children}
        </moviesContext.Provider>
    );
};
export default MoviesContext;