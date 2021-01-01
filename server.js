var http = require("http");
var url = require("url");
const { Client } = require("pg");
const fs = require("fs");

http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true);
    
    attendees =  [
        {"engin":"ali","ahmet":"veli"}
    ]

    const client = new Client({
      host: "localhost",
      port: 5432,
      database: "reservationsdemo",
      user: "postgres",
      password: "GE76V9EV",
    });


    client.connect();


    client
      .query("SELECT * FROM attendees")
      .then((res) => {
        return (attendees = res.rows);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        client.end();
      });




    if (request.url == "/venue") {
      response.writeHead(200, { "Content-Type": "text/html","Access-Control-Allow-Origin": "*" });
      response.write(fs.readFileSync("venue.html"));
    } else if (request.url == "/") {
      response.writeHead(200, { "Content-Type": "text/html","Access-Control-Allow-Origin": "*" } );
      response.write(fs.readFileSync("index.html"));
    } else if (request.url == "/events") {
      response.writeHead(200, { "Content-Type": "text/html","Access-Control-Allow-Origin": "*" } );
      response.write(fs.readFileSync("events.html"));
    } else {
      response.writeHead(200, { "Content-Type": "text/json","Access-Control-Allow-Origin": "*" } );
      response.write(JSON.stringify(attendees));
    }
    response.end("End of the Page");
  })
  .listen(3000);
