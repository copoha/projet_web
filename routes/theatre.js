const express = require("express");
const router = express.Router();
const axios = require("axios");
const BASE_URL = `https://cinema-public.opendatasoft.com/api/records/1.0/search/`


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
            q: town
        }
    })

router.get("/list", async(req, response) => {
    let data = await getTheatresByTown(req.query.town);
    response.send(data.data.records);
})

module.exports = router;