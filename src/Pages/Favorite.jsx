import React, { useContext } from 'react';
import { detailContext } from './DetailsContext';
const Favorite = () => {
  const { favorite } = useContext(detailContext);  
  return (
    <div className="flex flex-wrap justify-center gap-5 font-serif text-slate-600 p-5">
      {favorite.map((favorite, index) => (
        <div key={index} className="w-auto p-5 rounded-lg">
          <div>
            <img src={favorite.Poster} alt={favorite.Title} className="w-48 h-72 rounded-lg" />
          </div>
          <div className="text-black mt-3 text-center">
            <h2 className="font-semibold w-48">{favorite.Title}</h2>
            <p><b>Year:</b> {favorite.Year}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Favorite;