const express = require('express');
const axios = require('axios');
const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
    res.render("index", {weather: null, error: null})
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
    // Get the city from the query parameters
    const city = req.query.city;
    const apiKey = "433bb35fef783d7e4b733c2fef670d03";
    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    let weather;
    let error = null;
    try{
        let response = await axios.get(APIUrl);
        weather = response.data;
    }catch(error){
        weather = null;
        error = "Error please try again";
    }

    // Render the index template with the weather data and error message
    res.render("index", {weather , error});
})

const port = process.env.PORT || 7000
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})