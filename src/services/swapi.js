import axios from "axios"

const BASE_URL = "https://swapi.dev/api"

const getFilms = async (url) => {
    if (url) {
        const res = await axios.get(url)
        return res        
    }
    const res = await axios.get(`${BASE_URL}/films`)
    return res
}

const getFilm = async (id) => {
    const res = await axios.get(`${BASE_URL}/films/${id}`)
    return res
}

const getCharacters = async (url) => {
    if (url) {
        const res = await axios.get(url)
        return res        
    }
    const res = await axios.get(`${BASE_URL}/people`)
    return res
}

const getCharacter = async (id) => {
    const res = await axios.get(`${BASE_URL}/people/${id}`)
    return res
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getFilms,
    getFilm,
    getCharacters,
    getCharacter,
}