const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cors());

// connect to db
const db = require("./models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// set routing
require("./routes/route")(app);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server started on port ${port}`));
