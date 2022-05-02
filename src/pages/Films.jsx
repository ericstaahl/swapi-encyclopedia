import { useState, useEffect, useCallback } from "react"
import swapi from "../services/swapi"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link, useSearchParams } from "react-router-dom"
import ResourceSearch from "../components/ResourceSearch"

const Films = () => {
  const [apiResponse, setApiResponse] = useState("")
  const [searchParams, setSearchParams] = useSearchParams()
  const baseURL = "https://swapi.dev/api"
  const [page, setPage] = useState(1)
  const [savedQuery, setSavedQuery] = useState('');
  const [nextPageUrl, setNextPageUrl] = useState(null)
  const [prevPageUrl, setPrevPageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialRender, setIsInitialRender] = useState(true)


  const fetchFilms = async (url) => {
    console.log("Fetching films")
    setIsLoading(true)
    const data = await swapi.getFilms(url)
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
    // Needs to check this if user "navigates" to a search using the
    // browser navigation buttons or directly via url  
    if (searchParams.get('page') === null && searchParams.get('search') === null) {
      console.log("Initial fetch")
      fetchFilms()
      setIsInitialRender(false)
    }
  }, [searchParams])

  // fetch data if user navigates to a page without using the pagination buttons.
  useEffect(() => {
    if (searchParams.get('page')) {
      console.log("Page search running")
      setPage(Number(searchParams.get('page')))
      fetchFilms(`${baseURL}/films/?${searchParams}`)
    }
  }, [searchParams])

  // fetch data using the search query everytime searchParams is set.
  useEffect(() => {
    if (searchParams.get('search')) {
      console.log("Search running")
      setPage(1)
      setSavedQuery(searchParams.get('search'))
      fetchFilms(`${baseURL}/films/?${searchParams}`)
    }
  }, [searchParams])

  // set SearchParams to the current page number so 
  // that you can navigate to it directly from the browser url search bar
  // unfortunately does not work with the broswer navigation buttons

  useEffect(() => {
    if (isInitialRender === false) {
      setSearchParams({ page: page })
    }
  }, [isInitialRender, page, setSearchParams])

  // Only run on initial render.
  useEffect(() => {
    initialRender()
  }, [initialRender])

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
                fetchFilms()
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

        <h1>Films</h1>

        <Row className="d-flex justify-content-start g-4">

          {/* Check if apiResponse is truthy and then map over the results */}

          {apiResponse && (apiResponse.results.map(film => {
            return (
              <Col md={4} key={film.episode_id}>

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

          {apiResponse && apiResponse.count === 0 && (
            <p>No results were found</p>
          )}

        </Row>

        {/* Pagination implemented if the additional movies are ever
          added to the api */}

        <Row className="m-3">

          <Col className="d-flex justify-content-center">

            <Button className="mx-2" disabled={prevPageUrl === null || isLoading}
              onClick={() => {
                setPage(page - 1)
                fetchFilms(prevPageUrl)
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
                fetchFilms(nextPageUrl)
              }}>{"Page >"}
            </Button>

          </Col>

        </Row>

      </Container>
    </>
  )
}

export default Films