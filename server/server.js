const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const axios = require("axios");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080

// Allow cross-origin resource sharing using cors
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const apiKey = process.env.RAPID_API_KEY;

// Use bounds and type filter to retrieve places from API
app.post("/", (req, res) => {
    // Recieve data from frontend
    const data = req.body;
    const bounds = data["bounds"];
    const type = data["type"];

    // Set API request options
    const apiURL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
    const options = {
        method: "GET",
        url: apiURL,
        params: {
            bl_latitude: bounds["sw"][0],
            tr_latitude: bounds["ne"][0],
            bl_longitude: bounds["sw"][1],
            tr_longitude: bounds["ne"][1]
        },
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    }

    // Make API request and send response to frontend
    axios.request(options).then((response) => {
        res.send(response["data"]["data"])
    }).catch((error) => {
        console.log(error)
    })
});

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
});