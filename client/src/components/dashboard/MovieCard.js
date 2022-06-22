import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
export const MovieCard = ({ movie }) => {

    const [movieInfo, setMovieInfo] = useState({})
    const [loadingFinished, setLoadingFinished] = useState(false)


    const navigate = useNavigate()

    function getShowtime() {
        // concatene les heures de des seances
        return movie.showing.reduce((acc, val) => acc.concat(val.time), []).reduce((acc, current) => acc + ' - ' + current)
    }

    useEffect(() => {

        const fetchData = async () => {
            const res = await axios.get("/movies/movie", { params: { movie: movie.name } })
            // console.log(res.data)
            setMovieInfo(res.data)
            setLoadingFinished(true)

        }

        fetchData().catch(console.error)

    }, [])

    return (
        <div class='column'>

            <div class="col s2">
                {loadingFinished &&
                    <div class="card small" style={{ width: 'auto', marginLeft: 10, marginRight: 10, width: '300px' }}>
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator card-image" src={'https://image.tmdb.org/t/p/original/' + movieInfo.poster_path} />
                        </div>
                        <div class="card-content">
                            <span class="card-title activator grey-text text-darken-4">{movie.name}<i class="material-icons right">more_vert</i></span>
                            <p>{getShowtime()}</p>
                            <p>
                                <a href={movie.link} target="_blank">Plus de détails</a>
                            </p>
                        </div>

                        <div class="card-reveal">
                            <span class="card-title grey-text text-darken-4">{movie.name}<i class="material-icons right">close</i></span>
                            <p>{movieInfo.overview} </p>
                        </div>
                    </div>
                }

            </div>
        </div>

    )
}