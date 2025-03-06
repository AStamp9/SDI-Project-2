import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import PokemonContext from './PokemonContext.jsx';
import PokemonTypesContext from './PokemonTypesContext.jsx';

import Home from '../Home/Home.jsx';
import Battle from '../Battle/Battle.jsx';
import PokemonDetails from '../PokemonDetails/PokemonDetails.jsx';
import PokemonTypeList from '../PokemonTypeList/PokemonTypeList.jsx';
import TypeDetails from '../TypeDetails/TypeDetails.jsx';

import colorMode from '../../hooks/colorMode.js';

function App() {
  const navigate = useNavigate();
  const { mode, toggleMode } = colorMode();

  const [pokemonOne, setPokemonOne] = useState(null);
  const [pokemonTwo, setPokemonTwo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Use `useRef` to store the search input (no re-render)
  const searchInputRef = useRef("");

  // Fetch two random Pokémon for battle
  const fetchRandomPokemon = async () => {
    setLoading(true);
    try {
      const randomId1 = Math.floor(Math.random() * 151) + 1; // Kanto Pokémon (1-151)
      const randomId2 = Math.floor(Math.random() * 151) + 1;

      const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId1}`);
      const data1 = await res1.json();
      setPokemonOne(data1);

      const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId2}`);
      const data2 = await res2.json();
      setPokemonTwo(data2);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
    setLoading(false);
  };

  // Fetch Pokémon on initial load
  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  // 🔹 Handle Pokémon search only when clicking "Search"
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchInputRef.current.value.trim().toLowerCase();
    
    if (!trimmedQuery) {
      setError("Enter a valid Pokémon name or ID");
      return;
    }
    
    setError(""); // Clear previous errors
    navigate(`/pokemonDetails/${trimmedQuery}`);
  };

  return (
    <>
      <PokemonTypesContext.Provider value={{}}>
        <PokemonContext.Provider value={{}}>
          <nav>
            <button onClick={toggleMode}>Toggle Dark Mode</button>
            <button onClick={() => navigate('/')}>Pokemon Types</button>
            <button onClick={() => { fetchRandomPokemon(); navigate('/battle'); }}>New Battle</button>
            
            {/* 🟢 Search Input with useRef (no re-renders) */}
            <form id="search-form" onSubmit={handleSearch}>
              <input
                id="search-input"
                type="text"
                placeholder="Enter Pokémon Name or ID"
                ref={searchInputRef} // 🔹 No re-renders when typing
                size="25"
              />
              <button id="search-btn" type="submit">Search</button>
            </form>
            {error && <p style={{ color: 'red', marginLeft: '10px', marginTop: '5px' }}>{error}</p>}
          </nav>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/battle' element={
              loading ? <p>Loading Pokémon...</p> : 
              (pokemonOne && pokemonTwo ? <Battle playerOnePokemon={pokemonOne} playerTwoPokemon={pokemonTwo} fetchNewPokemon={fetchRandomPokemon} /> : <p>Error loading battle.</p>)
            } />
            <Route path='/pokemonTypeList' element={<PokemonTypeList />} />
            <Route path='/pokemonDetails/:name' element={<PokemonDetails />} />
            <Route path='/typeDetails/:id' element={<TypeDetails />} />
          </Routes>
        </PokemonContext.Provider>
      </PokemonTypesContext.Provider>
    </>
  );
}

export default App;
