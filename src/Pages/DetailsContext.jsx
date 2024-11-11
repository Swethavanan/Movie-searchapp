import React, { createContext, useState } from 'react';
 
export const detailContext = createContext();
const DetailsContext = ({children}) => {
    const[details,setDetails]=useState(null);
    const[favorite,setFavorite]=useState([])
    return (
        <detailContext.Provider value={{ details, setDetails,favorite,setFavorite }}>
            {children}
        </detailContext.Provider>
    );
};
export default DetailsContext;