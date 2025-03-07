import './Combatant.css';

export default function Combatant({ player, pokemonData, currentHP, currentAnimation }) {
    const maxHP = pokemonData?.stats[0]?.base_stat;

    return (
        <div className="combatant">
            {player === 'one' ? (
                <div>
                    <h2>Player 1</h2>
                    <p>{pokemonData?.name?.toUpperCase()}</p>
                    <p>{currentHP}/{maxHP} HP</p>

                    <img className={currentAnimation} src={pokemonData?.sprites?.other?.showdown?.back_default} alt={`${pokemonData?.name} back`} />
                </div>
            ) : (
                <div>
                    <h2>Player 2</h2>
                    <p>{pokemonData?.name?.toUpperCase()}</p>
                    <p>{currentHP}/{maxHP} HP</p>
                        <img className={currentAnimation} src={pokemonData?.sprites?.other?.showdown?.front_default} alt={`${pokemonData?.name} front`} />
                </div>
            )}
        </div>
    );
}

//<div className={isActive ? "active-class" : "inactive-class"}>