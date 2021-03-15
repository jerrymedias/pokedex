import axios from 'axios';

const baseUrl = 'https://pokeapi.co/api/v2/';

export const GetCards = (offset, limit) => {
    return axios.get(`${baseUrl}pokemon?offset=${offset}&limit=${limit}`);
}

export const GetPokemonDetails = (detailsUrl) => {
    return axios.get(detailsUrl);
}
