import { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"

const ResourceSearch = (props) => {
  // console.log(props)
  const baseURL = "https://swapi.dev/api"
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  // console.log(searchQuery)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setSearchParams({ search: searchQuery })
    console.log(`${baseURL}${props.resource}${searchParams}`)
    props.fetchSearch(`${baseURL}${props.resource}?${searchParams}`)
  }

  // useEffect(() => {
  //   setSearchParams({ search: searchQuery })
  // }, [searchQuery])

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="d-flex align-items-center">

          <Form.Label className="mx-2">Search</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter your search query here..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
            }}
          />
        </Form.Group>
        <Button type="submit" className="mx-2">Search</Button>
      </Form>
    </>
  )
}

export default ResourceSearch