import { useState, useEffect } from "react";
import Combatant from "../Combatant/Combatant";
import './Battle.css';

export default function Battle({ playerOnePokemon, playerTwoPokemon, fetchNewPokemon }) {
    const getMaxHP = (pokemon) => pokemon?.stats[0]?.base_stat || 100;

    const [playerOneHP, setPlayerOneHP] = useState(getMaxHP(playerOnePokemon));
    const [playerTwoHP, setPlayerTwoHP] = useState(getMaxHP(playerTwoPokemon));
    const [turn, setTurn] = useState('one');

    const [playerOneAnim, setPlayerOneAnim] = useState();
    const [playerTwoAnim, setPlayerTwoAnim] = useState();

    // Reset HP when new Pokémon are assigned (in case of a new battle)
    useEffect(() => {
        setPlayerOneAnim('idle-back');
        setPlayerTwoAnim('idle-front');
        const soundOne = new Audio(playerOnePokemon?.cries?.latest)?.play();
        const soundTwo = new Audio(playerTwoPokemon?.cries?.latest)?.play();
        setPlayerOneHP(getMaxHP(playerOnePokemon));
        setPlayerTwoHP(getMaxHP(playerTwoPokemon));
    }, [playerOnePokemon, playerTwoPokemon]);

    const attackOpponent = (setDefenderHP) => {
        const damage = Math.floor(Math.random() * 20) + 5; // Random damage 5-25
        setDefenderHP(prevHP => Math.max(prevHP - damage, 0)); // Prevents negative HP
    };

    const handlePlayerOneAttack = () => {
        if (playerOneHP > 0 && playerTwoHP > 0) {
            setPlayerTwoAnim('idle-front');
            setPlayerOneAnim('attack-back');
            attackOpponent(setPlayerTwoHP);
            setTurn("two");
        }
    };

    // Automate Player 2's attack after 1.5 seconds
    useEffect(() => {
        if (turn === "two" && playerTwoHP > 0 && playerOneHP > 0) {
            const timer = setTimeout(() => {
                setPlayerOneAnim('idle-back');
                setPlayerTwoAnim('attack-front');
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

        setPlayerOneAnim('idle-back');
        setPlayerTwoAnim('idle-front');
    };

    useEffect(() => {
        if (playerOneHP <= 0) {
            setPlayerOneAnim('faint-back');
        }
        if (playerTwoHP <= 0) {
            setPlayerTwoAnim('faint-front');
        }
    }, [playerOneHP, playerTwoHP])

    return (
        <div className="battle-container">
            <h1>Pokémon Battle</h1>
            <button onClick={handleRematch}>Rematch</button>
            <div className='battle-arena'>
                <Combatant
                    player="one"
                    pokemonData={playerOnePokemon}
                    currentHP={playerOneHP}
                    currentAnimation={playerOneAnim}
                />
                <Combatant
                    player="two"
                    pokemonData={playerTwoPokemon}
                    currentHP={playerTwoHP}
                    currentAnimation={playerTwoAnim}
                />
            </div>


            {playerOneHP > 0 && playerTwoHP > 0 && turn === "one" && (
                <button onClick={handlePlayerOneAttack}>Attack</button>
            )}

            {playerOneHP <= 0 ? <p>{playerOnePokemon?.name?.toUpperCase()} has fainted! Player 2 wins!</p> : null}

            {playerTwoHP <= 0 ? <p>{playerTwoPokemon?.name?.toUpperCase()} has fainted! Player 1 wins!</p> : null}

            <p>Current Turn: {turn === "one" ? "Player 1" : "Player 2 (Auto)"}</p>


        </div>
    );
}
