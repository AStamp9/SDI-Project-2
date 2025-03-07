import { useState, useEffect, useContext } from 'react'

import './Home.css'
import PokemonTypeCard from '../PokemonTypeCard/PokemonTypeCard.jsx'

function Home() {
    const [typeList, setTypeList] = useState([])

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/type/')
            .then(res => res.json())
            .then(data => {
                let results = data.results;
                results = results.slice(0, -2);
                setTypeList(results);
            })
    }, [])

    return (
        <>
            {/* <button>Reset</button> */}
            <h1>POKEMON TYPES</h1>
            <div className = 'pokemon-types-box'>
                {typeList.map(pokemonType => <PokemonTypeCard data={pokemonType} key={pokemonType.id}></PokemonTypeCard>
                )}
            </div>
        </>
    )
}

export default Home

