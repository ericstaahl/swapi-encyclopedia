import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import swapi from "../services/swapi"
import { getIdFromUrl } from "../helpers/urlExtract"
import { Container } from "react-bootstrap"


const Character = () => {
    const { id } = useParams()
    console.log(id)
    const [character, setCharacter] = useState()


    useEffect(() => {
        const fetchCharacter = async () => {
            const data = await swapi.getCharacter(id)
            console.log(data)
            setCharacter(data.data)
        }
        fetchCharacter()
    }, [id])

    return (
        <>
            {character && (
                <Container className="p-3">
                    <h2>{character.name}</h2>
                    <div>
                        <p>Gender: {character.gender}</p>
                        <p>Birth year: {character.birth_year}</p>
                        <p>Height: {character.height} cm</p>
                        <p>Mass: {character.mass} kg</p>
                        <p>Hair color: {character.hair_color}</p>
                    </div>
                    <h3>In films:</h3>
                    <div>
                        {character.films.map(film => {
                            const filmId = getIdFromUrl(film)
                            return (
                                <div key={filmId}>
                                    <Link to={`/films/${filmId}`}>Film {filmId}</Link>
                                </div>
                            )
                        })}
                    </div>
                </Container>
            )}
        </>
    )
}

export default Character