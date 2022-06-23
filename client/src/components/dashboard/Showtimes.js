import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouterComponent";
import { getShowtimesByTheatre } from "../../actions/theatreActions";
import { MovieCard } from "./MovieCard"

function Showtimes(props) {

    const { state } = useLocation();
    const { theatreName, townName } = state; // Read values passed on state by navigate
    

    useEffect(() => {
        
        console.log('theatreName, townName', theatreName, townName)
        // if they dont exist because user has navigated to the page by entering directly the url do nothing
        if (!theatreName || !townName) {
            return
        }

        // api call to get showtimes

        props.getShowtimesByTheatre(townName, theatreName)
        console.log('showtimes',props.showtimes)

    }, [])



    // if they dont exist because user has navigated to the page by entering directly the url return nothing
    if (!theatreName || !townName || props.showtimes.length === 0) {
        return (
            <div>
                <h1>Nothing found ...</h1>
            </div>
        )
    } else {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>{theatreName} - {townName}</h1>

                {props.showtimes.map(day => (
                    <div>
                        <p style={{fontSize:25, fontWeight:600, marginLeft:30}}>{day.day}</p>
                        <div style={{display:'flex', flexDirection: 'row'}}>
                            {day.movies.map(movie => <MovieCard movie={movie} />)}                            
                        </div>
                    </div>
                ))}
            </div>
        )
    }


}

Showtimes.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    theaters: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    showtimes: state.theaters.showtimes
});
export default connect(
    mapStateToProps,
    { getShowtimesByTheatre }
)(withRouter(Showtimes));