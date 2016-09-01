/* @flow */

import store from '../store';
import getAttackTypesForPokemon from './getAttackTypesForPokemon';
import type {
  Pokemon,
  PokemonType,
} from '../typeDefinitions';

export default function getWeakAgainstTypes(pokemon: Pokemon): Array<PokemonType> {
  const types = getAttackTypesForPokemon(pokemon);
  const typeChart = store.getTypeChart();
  const weakAgainst = typeChart.filter(t =>
    types.some(type => t.super_effective.includes(type)) &&
    !types.some(type => t.not_very_effective.includes(type))
  ).map(t => t.name);

  return weakAgainst;
}
