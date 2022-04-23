import axios from "axios"

const BASE_URL = "https://swapi.dev/api/"

const getFilms = async () => {
    const res = await axios.get(`${BASE_URL}/films`)
    return res
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getFilms,
}