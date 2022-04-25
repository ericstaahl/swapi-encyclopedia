import axios from "axios"

const BASE_URL = "https://swapi.dev/api/"

const getFilms = async () => {
    const res = await axios.get(`${BASE_URL}/films`)
    return res
}

const getFilm = async (id) => {
    const res = await axios.get(`${BASE_URL}/film/${id}`)
    return res
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getFilms,
    getFilm,
}