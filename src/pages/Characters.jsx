import { useState, useEffect } from "react"
import swapi from "../services/swapi"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { getIdFromUrl } from "../helpers/urlExtract"

const Films = () => {
  const [characters, setCharacters] = useState("")
  const fetchCharacters = async () => {
    const data = await swapi.getCharacters()
    console.log(data)
    setCharacters(data.data.results)
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  return (
    <>
      <Container className="p-3">
      <h1>Characters</h1>
        <Row className="d-flex justify-content-between g-4">
          {characters && (characters.map(character => {
            return (
              <Col key={getIdFromUrl(character.url)} xs={4}>
                <div className="border border-primary rounded p-3">
                  <h2>{character.name}</h2>
                  <div>
                    <p>Gender: {character.gender}</p>
                    <p>Birth year: {character.birth_year}</p>
                    <p>{character.films.length <= 1 ? `In ${character.films.length} film` : `In ${character.films.length} films`}</p>
                    <Button className="align-self-end" as={Link} to={`/people/${getIdFromUrl(character.url)}`}>Read more</Button>
                  </div>
                </div>
              </Col>
            )
          }))}
        </Row>
      </Container>
    </>
  )
}

export default Films