import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'

import { useState, useEffect, useContext } from 'react'

import './PokemonCard.css'
import { Shield } from '@mui/icons-material';

export default function PokemonCard(data) {
    const [pokemon, setPokemon] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        fetch(data?.data?.pokemon?.url)
            .then(res => res.json())
            .then(poke => {
                setPokemon(poke)
        })
    }, [])


    return (
        (pokemon?.sprites) ?
            ((pokemon?.sprites?.other?.showdown?.front_default) ? (
                <div onClick={() => {
                    // new Audio(pokemon?.cries?.latest).play();
                    navigate(`/pokemonDetails/${pokemon.name}`)
                }} className='pokemon-card'>
                    <img className='pokemon-card-img' src={pokemon['sprites']['other']['showdown']['front_default'] ?? pokemon?.sprites?.front_default} />
                    <p>{pokemon?.name.toUpperCase()}</p>
                </div>
            ) :
                (
                    <></>
                )) :
            (
                <div className='loader'></div>
            )
    )
}

