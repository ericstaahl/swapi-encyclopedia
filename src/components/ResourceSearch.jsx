import { useState, useEffect, useRef } from "react"
import { Form, Button } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"

const ResourceSearch = () => {
  const baseURL = "https://swapi.dev/api"
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setSearchParams({ search: searchQuery })
  }

  return (
    <>
      <Form className="d-flex align-items-center justify-content-center m-0" onSubmit={handleFormSubmit}>
        <Form.Group >
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