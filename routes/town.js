const express = require("express");
const router = express.Router();
const axios = require("axios");
const BASE_URL = `https://geo.api.gouv.fr/communes`;

//?nom=Metz&fields=nom&format=json&geometry=centre



const getTown = () => axios({
        method:"GET",
        url : BASE_URL,
        headers: {
            "content-type":"application/x-www-form-urlencoded",
        },
        params: {
            
        }
    })


router.get("/list", async(req, response) => {
    let data = await getTown();
    //console.log(data.data);
    response.send(data.data);
})

module.exports = router;