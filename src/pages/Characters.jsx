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
        <h1>Characters</h1>
      <Container>
        <Row className="d-flex justify-content-start">
          {characters && (characters.map(character => {
            return (
              <Col key={getIdFromUrl(character.url)} className="border border-primary rounded m-2" xs={3}>
                <h2>{character.name}</h2>
                <div className="align-self-end">
                  <p>Gender: {character.gender}</p>
                  <p>Birth year: {character.birth_year}</p>
                  <p>In {character.films.length}</p>
                  <Button as={Link} to={`/people/${getIdFromUrl(character.url)}`}>Read more</Button>
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