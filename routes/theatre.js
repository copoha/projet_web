const express = require("express");
const router = express.Router();
const axios = require("axios");
const BASE_URL = `https://cinema-public.opendatasoft.com/api/records/1.0/search/`;
const SHOWTIMES_URL = "https://serpapi.com/search.json?";
const { serpAPIKey } = require("../config/key");


const getTheatresByTown = (town) => axios({
        method:"GET",
        url : BASE_URL,
        headers: {
            "content-type":"application/x-www-form-urlencoded",
           // "x-rapidapi-host":"astrology-horoscope.p.rapidapi.com",
           // "x-rapidapi-key": "yourapikey"
        },
        params: {
            dataset: 'liste-des-etablissements-cinematographiques-en-france',
            q: "ville:"+ town,
            rows: 100
        }
    })

const getShowtimesByTheatre = (town, theatre) => axios({
    method:"GET",
    url : SHOWTIMES_URL,
    headers: {
        "content-type":"application/x-www-form-urlencoded",
    },
    params: {
        api_key: serpAPIKey,
        q: "cinema "+theatre + " horaires",
        location: town,
        hl: "fr",
        gl: "fr"}
})

router.get("/list", async(req, response) => {
    let data = await getTheatresByTown(req.query.town);
    response.send(data.data.records);
})

router.get("/showtimes", async(req, response) => {
    let data = await getShowtimesByTheatre(req.query.town, req.query.theatre);
    //console.log(data.data);
    response.send(data.data.showtimes);
})

module.exports = router;