import { useEffect, useState } from "react"
import { Button, Container } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import swapi from "../services/swapi"
import { getIdFromUrl } from "../helpers/urlExtract"


const Film = () => {
    const { id } = useParams()
    console.log(id)
    const [film, setFilm] = useState()

    const fetchFilm = async () => {
        const data = await swapi.getFilm(id)
        console.log(data)
        setFilm(data.data)
    }

    useEffect(() => {
        fetchFilm()
    }, [])

    return (
        <>
            {film && (
                <Container>
                    <h2>{film.title}</h2>
                    <div>
                        <p>Director: {film.director}</p>
                        <p>{`Producer(s)`}: {film.producer}</p>
                        <p>Episode: {film.episode_id}</p>
                        <p>Release date: {film.release_date}</p>
                        <p>Number of characters: {film.characters.length}</p>
                    </div>
                    <h3>Links</h3>
                    <div>
                        {film.characters.map(characterURL => {
                            const characterId = getIdFromUrl(characterURL)
                            console.log(characterId)
                            return (
                                <div key={characterId}>
                                    <Link to={`/people/${characterId}`}>{`Character: ${characterId}`}</Link>
                                </div>
                            )
                        })}
                    </div>
                </Container>
            )
            }
        </>
    )
}

export default Film