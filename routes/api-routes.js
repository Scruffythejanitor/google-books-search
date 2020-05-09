const cheerio = require("cheerio")
const axios = require("axios")
const db = require("../models")

module.exports = function (app){

    app.get('/books', function (request, response) {
        // response.send('The Holy Hand Grenade Of Antioch');
        db.GoogleBook
          .find({})
          .then(function (data) {
            response.json(data);
          });
      });

}
