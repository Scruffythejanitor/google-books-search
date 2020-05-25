const cheerio = require("cheerio")
const axios = require("axios")
const db = require("../models")


module.exports = function (app){

    app.get('/saved', function (request, response) {
        // response.send('The Holy Hand Grenade Of Antioch');
        db.GoogleBook
          .find({})
          .then(function (data) {
            response.json(data);
          });
      });

      app.post("/save", function ({body}, res){
        // console.log(body);
        
        const {volumeInfo} = body
        
        

        db.GoogleBook.create({
          name: volumeInfo.title,
          authors: volumeInfo.authors,
          description: volumeInfo.description,
          image: volumeInfo.imageLinks.thumbnail,
          link: volumeInfo.infoLink,
          
        })
        .then(response => {res.send(response)})
      })
}
