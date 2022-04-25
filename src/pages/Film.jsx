import { useParams } from "react-router-dom"

const Film = () => {
    const { id } = useParams()
    console.log(id)
    return (
        <div>Episode: {id} </div>
    )
}

export default Film