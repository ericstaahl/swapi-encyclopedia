import { useState, useEffect } from "react"
import swapi from "../services/swapi"
import { Container, Row, Col } from "react-bootstrap"

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
      <h1>Films</h1>
      <div className="App">

        <Container>
          <Row className="d-flex justify-content-center">
            {films && (films.map(film => {
              return (
                <Col className="border border-primary rounded m-2" xs={3} key={film.episode_id}>
                  <h2>{film.title}</h2>
                  <div className="align-self-end">
                    <p>Episode: {film.episode_id}</p>
                    <p>Release date: {film.release_date}</p>
                    <p>Number of characters: {film.characters.length}</p>
                  </div>
                </Col>
              )
            }))}
          </Row>
        </Container>

      </div>
    </>
  )
}

export default Films