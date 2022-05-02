import { useState, useEffect, useCallback } from "react"
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

  // Function to be passed down as a prop to ResourceSearch
  // Sets searchParams which triggers a search and a rerender
  const onSearch = (searchQuery) => {
    setSearchParams({ search: searchQuery })
  }

  // Function to run on initial render

  const initialRender = useCallback(() => {
    // Needs to check this is user "navigates" to a search using the
    // browser navigation buttons or directly via url  
    console.log(searchParams.get('search'))
    console.log(searchParams.get('page'))

    if (searchParams.get('page') === null && searchParams.get('search') === null) {
      console.log("Initial fetch")
      fetchCharacters()
    }
    
    if (searchParams.get('search')) {
      console.log("Search running")
      setPage(1)
      setSavedQuery(searchParams.get('search'))
      fetchCharacters(`${baseURL}/people/?${searchParams}`)
    }

    if (searchParams.get('page')) {
      console.log("Page search running")
      setPage(Number(searchParams.get('page')))
      fetchCharacters(`${baseURL}/people/?${searchParams}`)
    }

}, [searchParams])

  // set SearchParams to the current page number so 
  // that you can navigate to it directly from the browser url search bar
  // unfortunately does not work with the broswer navigation buttons

  // useEffect(() => {
  //   setSearchParams({ page: page })
  // }, [page, setSearchParams])

  // Only run on initial render.

  useEffect(() => {
    initialRender()
  }, [])

  // fetch data using the search query everytime searchParams is set.

  // useEffect(() => {
  //   console.log(searchParams)
  //   // make sure it only runs if search is in the url
  // }, [searchParams])

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
            <ResourceSearch onSearch={onSearch}></ResourceSearch>
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

          {/* Check if apiResponse is truthy and then map over the results */}

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

          {apiResponse && apiResponse.count === 0 && (
            <p>No results were found</p>
          )}

        </Row>

        <Row className="m-3">

          <Col className="d-flex justify-content-center">

            {/* Fetch the data using the "next" and "previous" values from the API response. */}

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