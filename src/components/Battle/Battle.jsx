import { useState, useEffect } from "react";
import Combatant from "../Combatant/Combatant";

export default function Battle({ playerOnePokemon, playerTwoPokemon, fetchNewPokemon }) {
    const getMaxHP = (pokemon) => pokemon.stats[0]?.base_stat || 100;

    const [playerOneHP, setPlayerOneHP] = useState(getMaxHP(playerOnePokemon));
    const [playerTwoHP, setPlayerTwoHP] = useState(getMaxHP(playerTwoPokemon));
    const [turn, setTurn] = useState('one');

    // Reset HP when new Pokémon are assigned (in case of a new battle)
    useEffect(() => {
        setPlayerOneHP(getMaxHP(playerOnePokemon));
        setPlayerTwoHP(getMaxHP(playerTwoPokemon));
    }, [playerOnePokemon, playerTwoPokemon]);

    const attackOpponent = (setDefenderHP) => {
        const damage = Math.floor(Math.random() * 20) + 5; // Random damage 5-25
        setDefenderHP(prevHP => Math.max(prevHP - damage, 0)); // Prevents negative HP
    };

    const handlePlayerOneAttack = () => {
        if (playerOneHP > 0 && playerTwoHP > 0) {
            attackOpponent(setPlayerTwoHP);
            setTurn("two");
        }
    };

    // Automate Player 2's attack after 1.5 seconds
    useEffect(() => {
        if (turn === "two" && playerTwoHP > 0 && playerOneHP > 0) {
            const timer = setTimeout(() => {
                attackOpponent(setPlayerOneHP);
                setTurn("one");
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [turn, playerTwoHP, playerOneHP]);

    // 🟢 Rematch Function - Resets HP to full without changing Pokémon
    const handleRematch = () => {
        setPlayerOneHP(getMaxHP(playerOnePokemon));
        setPlayerTwoHP(getMaxHP(playerTwoPokemon));
        setTurn("one");
    };

    return (
        <div className="battle-container">
            <h1>Pokémon Battle</h1>
            <button onClick={handleRematch}>Rematch</button>
            <Combatant 
                player="one" 
                pokemonData={playerOnePokemon} 
                currentHP={playerOneHP} 
            />
            <Combatant 
                player="two" 
                pokemonData={playerTwoPokemon} 
                currentHP={playerTwoHP} 
            />
            
            {playerOneHP > 0 && playerTwoHP > 0 && turn === "one" && (
                <button onClick={handlePlayerOneAttack}>Attack</button>
            )}

            {playerOneHP <= 0 ? <p>{playerOnePokemon.name} has fainted! Player 2 wins!</p> : null}
            {playerTwoHP <= 0 ? <p>{playerTwoPokemon.name} has fainted! Player 1 wins!</p> : null}

            <p>Current Turn: {turn === "one" ? "Player 1" : "Player 2 (Auto)"}</p>


        </div>
    );
}
