const express = require("express");
const router = express.Router();
const axios = require("axios");
const SerpApi = require('google-search-results-nodejs');
const keys = require("../config/key");
const search = new SerpApi.GoogleSearch(keys.serpAPIKey);

const params = {
    
};

const callback = function(data) {
  console.log(data["showtimes"]);
};

// Show result as JSON
search.json(params, callback);

const getShowtimesByTheatres = (town, theatre) => axios({
        method:"GET",
        url : "https://serpapi.com/search.json?",
        headers: {
            "content-type":"application/x-www-form-urlencoded",
        },
        params: {
            q: theatre + " horaires",
            location: town,
            hl: "fr",
            gl: "fr"}
    })

router.get("/showtimes", async(req, response) => {
    let data = await getShowtimesByTheatres(req.query.theatre);
    response.send(data.showtimes);
})

module.exports = router;