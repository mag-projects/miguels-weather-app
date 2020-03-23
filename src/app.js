const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geolocation = require("./utils/geolocation");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../templates/views");

// Sets up express to read hbs files
app.set("view engine", "hbs");
// Sets up the location for the HBS files
app.set("views", viewsDirectory);

app.use(express.static(publicDirectory));


// Client side
app.get("/", (req, res) => {
    res.render("index", {
        title: "Simple Weather App"
    });
});

// Backend
app.get("/weather", (req, res) => {
    if (!req.query.address) res.send({error: "Please enter a location to search!"});

    geolocation(req.query.address, (err, {lat, long, name}) => {
        if (err) return res.send({error: err});

        forecast(lat, long, (err, {summary, high, low, current, rainChance}) => {
            if (err) return res.send({error: err});
            res.send({
                location: name,
                summary,
                high,
                low,
                current,
                rainChance
            });
        });
    });
});

// Port setup
app.listen(port, () => console.log(`Listening on port ${port} mothafucka!!!`));
