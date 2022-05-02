import { useState, useEffect } from "react"
import swapi from "../services/swapi"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link, useSearchParams } from "react-router-dom"
import { getIdFromUrl } from "../helpers/urlExtract"
import ResourceSearch from "../components/ResourceSearch"

const Characters = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [apiResponse, setApiResponse] = useState("")
  const [page, setPage] = useState(1)
  const [nextPageUrl, setNextPageUrl] = useState(null)
  const [prevPageUrl, setPrevPageUrl] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [savedQuery, setSavedQuery] = useState('');

  const baseURL = "https://swapi.dev/api"

  const fetchCharacters = async (url) => {
    setIsLoading(true)
    if (url) {
      // setSearchParams(pageQuery())
      const data = await swapi.getCharacters(url)
      console.log(data)
      setApiResponse(data.data)
      setNextPageUrl(data.data.next)
      setPrevPageUrl(data.data.previous)
      setIsLoading(false)
      return
    }
    const data = await swapi.getCharacters()
    console.log(data)
    setApiResponse(data.data)
    setNextPageUrl(data.data.next)
    setPrevPageUrl(data.data.previous)
    setIsLoading(false)
  }

  useEffect(() => {
    setSearchParams({ page: page })
  }, [page, setSearchParams])

  // Only run on initial render.
  // Therefore ignoring the lint error about missing dependency.
  useEffect(() => {
    if (searchParams.get('page')) {
      console.log("Initial render is running")
      console.log(typeof Number(searchParams.get('page')))
      setPage(Number(searchParams.get('page')))
      fetchCharacters(`https://swapi.dev/api/people/?${searchParams}`)
      return
    }
    if (!searchParams.get('search')) {
      fetchCharacters()
    }
  }, [])

  useEffect(() => {
    console.log(searchParams)
    if (searchParams.get('search')) {
      console.log("Search running")
      setPage(1)
      setSavedQuery(searchParams.get('search'))
      fetchCharacters(`${baseURL}/people/?${searchParams}`)

    }
  }, [searchParams])



  return (
    <>
      <Container className="p-3">

        <Row>
          {/* "Resets" the search by setting the page number to 1 and the savedQuery to an empty string. Then refetches the resource without any extra parameters. */}

          <Col className="d-flex justify-content-center" xs={12}>
            <Button
              onClick={() => {
                setPage(1)
                setSavedQuery('')
                fetchCharacters()
              }}
              className="m-2"
            >Reset
            </Button>
            <ResourceSearch></ResourceSearch>
          </Col>

        </Row>

        <Row>

          <Col xs={8}>
            {savedQuery && (
              <div>
                <p className="search-result-text">Search results for <span>{savedQuery}</span></p>
              </div>
            )}
          </Col>

        </Row>

        <h1>Characters</h1>

        <Row className="d-flex justify-content-start g-4">

          {apiResponse && (apiResponse.results.map(character => {
            return (
              <Col key={getIdFromUrl(character.url)} md={4}>
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

            <Button className="mx-2" disabled={prevPageUrl === null || isLoading}
              onClick={() => {
                setPage(page - 1)
                fetchCharacters(prevPageUrl)
              }}>{"< Page"}
            </Button>

            <p>{page}/
              {apiResponse.count === 0 ? 1 : Math.ceil(apiResponse.count / 10)}
            </p>

            <Button
              className="mx-2"
              disabled={nextPageUrl === null || isLoading}
              onClick={() => {
                setPage(page + 1)
                fetchCharacters(nextPageUrl)
              }}>{"Page >"}
            </Button>

          </Col>

        </Row>

      </Container>
    </>
  )
}

export default Characters