const express = require("express");
const router = express.Router();
const axios = require("axios");
const BASE_URL = `https://api.themoviedb.org/3/search/movie?`;
const { tmdbAPIKey } = require("../config/key");

//https://api.themoviedb.org/3/search/movie?api_key=8ac9a2cb1174ad9d896d1d97e68a48fa&language=fr-FR&page=1&include_adult=false&query=Top%20Gun:%20Maverick


const getMovieByName = (name) => axios({
    method: "GET",
    url: BASE_URL,
    headers: {
        "content-type": "application/x-www-form-urlencoded",
    },
    params: {
        api_key: tmdbAPIKey,
        language:"fr-FR",
        include_adult:false,
        query:name

    }
})

router.get("/movie", async (req, response) => {
    let data = await getMovieByName(req.query.movie);
    //console.log(data.data);
    response.send(data.data.results[0]);
})


module.exports = router;