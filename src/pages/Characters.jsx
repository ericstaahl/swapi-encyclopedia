import { useState, useEffect } from "react"
import swapi from "../services/swapi"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { getIdFromUrl } from "../helpers/urlExtract"

const Films = () => {
  const [apiResponse, setApiResponse] = useState("")
  const [page, setPage] = useState(1)
  const [nextPageUrl, setNextPageUrl] = useState(null)
  const [prevPageUrl, setPrevPageUrl] = useState(null)
  const fetchCharacters = async (url) => {
    if (url) {
      const data = await swapi.getCharacters(url)
      console.log(data)
      setApiResponse(data.data)
      setNextPageUrl(data.data.next)
      setPrevPageUrl(data.data.previous)
      return
    }
    const data = await swapi.getCharacters()
    console.log(data)
    setApiResponse(data.data)
    setNextPageUrl(data.data.next)
    setPrevPageUrl(data.data.previous)
  }

  // const nextPage = async () => {
  //   const data = await swapi.search(nextPageUrl)
  //   setCharacters(data.data.results)
  //   setNextPageUrl(data.data.next)
  //   setPrevPageUrl(data.data.previous)
  // }

  // const prevPage = async () => {
  //   const data = await swapi.search(prevPageUrl)
  //   setCharacters(data.data.results)
  //   setNextPageUrl(data.data.next)
  //   setPrevPageUrl(data.data.previous)
  // }

  useEffect(() => {
    fetchCharacters()
  }, [])

  return (
    <>
      <Container className="p-3">
        <h1>Characters</h1>
        <Row className="d-flex justify-content-start g-4">
          {apiResponse && (apiResponse.results.map(character => {
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
        <Row className="m-3">
          <Col className="d-flex justify-content-center">
            <Button className="mx-2" disabled={prevPageUrl === null}
              onClick={() => {
                const pageNumber = page - 1
                setPage(pageNumber)
                fetchCharacters(prevPageUrl)
              }}>{"< Page"}
            </Button>
            <p>{page}/{Math.ceil(apiResponse.count / 10)}</p>
            <Button className="mx-2" disabled={nextPageUrl === null}
              onClick={() => {
                const pageNumber = page + 1
                setPage(pageNumber)
                fetchCharacters(nextPageUrl)
              }}>{"Page >"}
            </Button>
          </Col>

        </Row>
      </Container>
    </>
  )
}

export default Films