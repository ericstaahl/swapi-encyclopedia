import { useState } from "react"
import { Form, Button } from "react-bootstrap"

const ResourceSearch = (props) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // function passed down as prop to set searchParams in parent component.
    props.onSearch(searchQuery)
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