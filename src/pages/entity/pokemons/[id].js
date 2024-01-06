// modules
import React from 'react';
// components
import PokemonArticle from '@/components/article/PokemonArticle';
import PokemonContainer from '@/containers/PokemonContainer';

const PokemonPage = () => <PokemonContainer Component={PokemonArticle} />;

export default PokemonPage;
