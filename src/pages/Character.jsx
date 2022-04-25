import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import swapi from "../services/swapi"


const Character = () => {
    const { id } = useParams()
    console.log(id)
    const [character, setCharacter] = useState()

    // const fetchCharacter = async () => {
    //     const data = await swapi.getFilm(id)
    //     console.log(data)
    //     setCharacter(data.data)
    // }

    return (
        <>
            {true && (
                <>
                    ID of character: {id}
                </>
            )}
        </>
    )
}

export default Character