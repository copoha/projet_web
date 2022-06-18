import { useNavigate } from "react-router-dom"

export const Theaters = ({ theatre }) => {

    const navigate = useNavigate()

    return (
        <div class='column'>

            <div class="col s2" key={theatre.recordid}>
                <div class="card small" style={{ width: 'auto', marginLeft: 10, marginRight: 10 }}>
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src={require("../../images/salle.webp")} />
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">{theatre.fields.cinema}<i class="material-icons right">more_vert</i></span>
                        <p>
                            <a onClick={() => navigate('/showtimes', { state: { theatreName: theatre.fields.cinema, townName: theatre.fields.ville } })}>Séances à venir</a>
                        </p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">{theatre.fields.cinema}<i class="material-icons right">close</i></span>
                        <p>{theatre.fields.adresse}, {theatre.fields.ville} </p>
                    </div>
                </div>
            </div>
        </div>

    )
}