import React, { useContext } from "react";
import { detailContext } from "./DetailsContext";
const Details = () => {
  const { details } = useContext(detailContext);
  if (!details) {
    return <p>No details available</p>;
  }
  return (
    <div
    className={`flex justify-center items-center gap-5 font-serif bg-grey-500 text-slate-600 p-5 bg-[url(${details.poster})]`}
  >
      <div>
        <img src={details.Poster} alt={details.Title} />
      </div>
      <div>
        <h2 className="font-semibold text-center">{details.Title}</h2>
        <p><b>Year:</b> {details.Year}</p>
        <p><b>Rated: </b>{details.Rated}</p>
        <p><b>RunTime: </b>{details.RunTime}</p>
        <p><b>Genre: </b>{details.Genre}</p>
        <p><b>Director: </b>{details.Director}</p>
        <p><b>Writer: </b>{details.Writer}</p>
        <p><b>Actors: </b>{details.Actors}</p>
        <p className="w-80"><b>Plot: </b>{details.Plot}</p>
        <p><b>Language: </b>{details.Language}</p>
        <p><b>Country: </b>{details.Country}</p>
        <h3><b>Ratings:</b></h3>
        {details.Ratings &&
          details.Ratings.map((item, index) => (
            <div key={index}>
              <p><b>Source: </b>{item.Source}</p>
              <p><b>Value: </b>{item.Value}</p>
            </div>
          ))}
      </div>
    </div>
    
  );
};
export default Details;