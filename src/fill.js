/* @flow */

import db from './db';
import pokemons from './pokemons.json';
import types from './types.json';

export default function fill() {
  db.write(() => {
    const types = db.objects('Type');
    const pokemons = db.objects('Pokemon');
    db.delete(types);
    db.delete(pokemons);
  });

  if (db.objects('Type').length === 0) {
    db.write(() => {
      types.forEach(type => {
        db.create('Type', {
          name: type.name,
          immunes: type.immunes.map(i => ({ name: i })),
          weaknesses: type.weaknesses.map(i => ({ name: i })),
          strengths: type.strengths.map(i => ({ name: i })),
        }, true);
      });
    });
  }

  if (db.objects('Pokemon').length === 0) {
    db.write(() =>
      pokemons.forEach(pokemon => {
        db.create('Pokemon', {
          id: pokemon.id,
          name: pokemon.name,
          type: pokemon.types.map(t => ({ name: t })),
          description: pokemon.description,
          category: pokemon.category,
          max_cp: pokemon.max_cp,
          max_hp: pokemon.max_hp,
          stamina: pokemon.stamina,
          attack: pokemon.attack,
          defense: pokemon.defense,
          capture_rate: pokemon.capture_rate,
          flee_rate: pokemon.flee_rate,
          height: pokemon.height,
          weight: pokemon.weight,
          evolution_chain: pokemon.evolution_chain ? (
            Array.isArray(pokemon.evolution_chain[0]) ? pokemon.evolution_chain : [ pokemon.evolution_chain ]
          ).map(chains => ({ chains: chains.map(id => ({ id })) })) : [],
        }, true);
      })
    );
  }
}
