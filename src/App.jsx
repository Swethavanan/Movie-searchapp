import React from 'react';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Home from './Pages/Home';
import Details from './Pages/Details';
import Navbar from './Components/Navbar';
import DetailsContext from './Pages/DetailsContext';
import MoviesContext from './Pages/MoviesContext';
import Footer from './Components/Footer';
import Favorite from './Pages/Favorite';
const App = () => {
  return (
    <div>
      <MoviesContext>
      <DetailsContext>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/details" element={<Details/>}/>
        <Route path="/favorite" element={<Favorite/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
      </DetailsContext>
      </MoviesContext>
    </div>
  );
};
export default App;