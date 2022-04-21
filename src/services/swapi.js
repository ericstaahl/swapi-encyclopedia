import axios from "axios"

const BASE_URL = "https://swapi.dev/api/"

const getInfo = async () => {
    const res = await axios.get(`${BASE_URL}/people`)
    return res
}

export default {
    getInfo,
}