// exporting this way because we dont have ES6 in server side
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// calculate in which path you are, dont matter where are you workingkkkkkk
const path = require("body-parser");

// load the .env into the process enviroment of the server allowing access to secret key
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// bring stripe library function
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// instanstiate a new express aplication to build de API server
const app = express();
// server port
const port = process.env.PORT || 5000;

// parser to json all the body parser that we get
app.use(bodyParser.json());
// urlencoded to parse to correct url without symbols that cant handle
app.use(bodyParser.urlencoded({ extended: true }));

// be able make request from our localhost:3000 to server port 5000
app.use(cors());

//if production, serve all static files in a build (__dirname is part of Node.js and is going to point to client/build)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  // any url that the user/client hits, pass this function as a response
  app.get("*", function (req, res) {
    // all code into an index.html
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// after previous code, listen in port 5000
app.listen(port, (error) => {
  if (error) throw error;
  // log to see all is correct
  console.log("Server running on port " + port);
});

// function that fires when the client make a post request to the route /payment
app.post("/payment", (req, res) => {
  // body que se enviará a la API de stripe
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  // second parameter function callback with the res of the Stripe API
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    stripeErr
      ? res.status(500).send({ error: stripeErr })
      : res.status(200).send({ success: stripeRes });
  });
});
