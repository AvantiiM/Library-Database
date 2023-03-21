var http = require("http");
var url = require("url");
var querystring = require("querystring");

function start(route, handle) {
  function onRequest(request, response) {
    var postData = ""; // new
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8"); //new

    request.addListener("data", function(chunk) { //new
      postData += chunk;
    });

    request.addListener("end", function() {
      route(handle, pathname, response, postData); //new
    });

    // route(handle, pathname, response);
  }

  http.createServer(onRequest).listen(3000);
  console.log("Server has started.");
}

exports.start = start;