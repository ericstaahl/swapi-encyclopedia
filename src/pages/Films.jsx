import { useState, useEffect } from "react"
import swapi from "../services/swapi"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link, useSearchParams } from "react-router-dom"
import ResourceSearch from "../components/ResourceSearch"

const Films = () => {
  const [films, setFilms] = useState("")
  const [searchParams] = useSearchParams()
  const baseURL = "https://swapi.dev/api"

  const fetchFilms = async (url) => {
    console.log("Fetching films")
    const data = await swapi.getFilms(url)
    console.log(data)
    setFilms(data.data.results)
  }

  // Only run on initial render.
  // Therefore ignoring the lint error about missing dependency.
  useEffect(() => {
    if (!searchParams.get('search')) {
      fetchFilms()
    }
  }, [])

  useEffect(() => {
    console.log(searchParams)
    if (searchParams.get('search')) {
      fetchFilms(`${baseURL}/films/?${searchParams}`)
    }
  }, [searchParams])

  return (
    <>
      <Container className="p-3">
        <Col className="m-auto" xs={8}>
          <ResourceSearch></ResourceSearch>
        </Col>
        <h1>Films</h1>
        <Row className="d-flex justify-content-start g-4">
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