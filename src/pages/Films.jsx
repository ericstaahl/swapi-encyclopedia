import { useState, useEffect } from "react"
import swapi from "../services/swapi"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const Films = () => {
  const [films, setFilms] = useState("")
  const fetchFilms = async () => {
    const data = await swapi.getFilms()
    console.log(data)
    setFilms(data.data.results)
  }

  useEffect(() => {
    fetchFilms()
  }, [])

  return (
    <>
      <Container className="p-3">
        <h1>Films</h1>
        <Row className="d-flex justify-content-center g-4">
          {films && (films.map(film => {
            return (
              <Col xs={4} key={film.episode_id}>
                <div className="border border-primary rounded p-3">
                  <h2>{film.title}</h2>
                  <div className="align-self-end">
                    <p>Episode: {film.episode_id}</p>
                    <p>Release date: {film.release_date}</p>
                    <p>Number of characters: {film.characters.length}</p>
                    <Button as={Link} to={`/films/${film.episode_id}`}>Read more</Button>
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