import { useState, useEffect } from "react"
import swapi from "../services/swapi"

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
      <div>films</div>
      <div className="App">

        <div>{films && (films.map(film => {
          return <div key={film.episode_id}><h2>{film.title}</h2></div>
        }))}
        </div>

      </div>
    </>
  )
}

export default Films