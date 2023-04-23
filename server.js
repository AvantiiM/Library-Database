var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");
var path = require("path");
var cons = require('consolidate');

//-- These are for session handling.
const { UserSession } = require("./UserSession");
const crypto = require('crypto');
const { loginverify } = require("./requestHandlers");
let mapSession = new Map();

function parseCookies(request) {
  const list = {};
  const cookieHeader = request.headers?.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(`;`).forEach(function (cookie) {
    let [name, ...rest] = cookie.split(`=`);
    name = name?.trim();
    if (!name) return;
    const value = rest.join(`=`).trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });

  return list;
}

function start(route, handle) {
  function onRequest(request, response) {

    var postData = ""; // new
    var pathname = url.parse(request.url).pathname;
    var usession;
    console.log("Request for " + pathname + " received.");

    if (pathname === "/favicon.ico") {
      let frstream = fs.readFileSync("./favicon.ico");
      response.statusCode = "200";
      response.setHeader("Content-Type", "image/jpeg");
      //frstream.pipe(response);
      response.end(frstream);
      return;
    }
    if (pathname === "/LibDB_WOBG.png") {
      let frstream = fs.readFileSync("./LibDB_WOBG.png");
      response.statusCode = "200";
      response.setHeader("Content-Type", "image/png");
      //frstream.pipe(response);
      response.end(frstream);
      return;
    }
    let cks = parseCookies(request);
    let sessId = cks['sessionId'];
    let login_req = false;
    console.log("------------ from brower: " + sessId + " ------------");

    if (sessId && !mapSession.get(sessId)) {
      console.log("Deleting old session: " + sessId);
      sessId = null;
    }
    if (!sessId) {
      sessId = crypto.randomUUID();
      login_req = true;
      console.log("created uuid: " + sessId);
      request.setEncoding("utf8"); //new
      usession = new UserSession(sessId, "Houston", "Houston");
      mapSession.set(sessId, usession);
    }
    usession = mapSession.get(sessId);

    if (pathname.startsWith("/public/")) {
      var filePath = path.join(__dirname, pathname);
      fs.readFile(filePath, function (err, data) {
        if (err) {
          // response.writeHead(404, {"Content-Type": "text/plain"});
          // response.write("404 Not Found\n");
          // response.end();
          window.location('/404')
          response.end();
        } else {
          var contentType;
          if (pathname.endsWith(".css")) {
            contentType = "text/css";
          } else if (pathname.endsWith(".js")) {
            contentType = "text/javascript";
          } else if (pathname.endsWith(".png")) {
            contentType = 'image/png';
          } else {
            contentType = "text/plain";
          }
          response.writeHead(200, { "Content-Type": contentType });
          response.write(data);
          response.end();
        }
        //return; //Added 4/9
      });
    }
    else {
      request.setEncoding("utf8"); //new
      if ((!usession.loggedDT || login_req) && pathname !== "/PasswordChanger") {
        //pathname = "/login";
        if (pathname !== "/" && pathname !== "/login" && pathname !== "/loginverify") {
          console.log("Routing to login verification");
          cons.ejs('./login.html', { msg: "Invalid session please login" }, function (err, html) {
            if (err) {
              console.error('Error templating with EJS');
              throw err;
            }
            response.write(html);
            response.end();
            //return;
          });

          // response.writeHead(302, {"Location": "/login"});
          // response.end();
          return;
        }
        // requestHandlers.loginverify(request, response, userSess);
        // return;
      }

      // response.writeHead(302, {"Location": "/login"});
      // response.end();
      //return;

      if (pathname === "/login" || pathname === "/") {
        console.log("Routing to login page");
        cons.ejs('login.html', { msg: "" }, function (err, html) {
          if (err) {
            console.error('Error templating with EJS');
            throw err;
          }
          response.write(html);
          response.end();
          return;
        });
      } else {
        // console.log("session id: " + userSess.getSessonId());
        // console.log("session user: " + userSess.getUserName());
        if (pathname === "/logout") {
          if (usession && (usession.sessionId)) {
            mapSession.delete(usession.sessionId);
          }
          cons.ejs('login.html', { msg: "Logout successful" }, function (err, html) {
            if (err) {
              console.error('Error templating with EJS');
              throw err;
            }
            response.write(html);
            response.end();
            return;
          });
        } else {
          request.addListener("data", function (chunk) { //new
            postData += chunk;
          });

          request.addListener("end", function () {
            route(handle, pathname, response, postData, usession); //new
            console.log("----session id: " + usession.sessionId);//sessionId
            console.log("----session user: " + usession.logginId);
            console.log("----session date: " + usession.loggedDT);
            console.log("Request handling complete");
          });
        }
      }
    }
    // route(handle, pathname, response);
  }

  http.createServer(onRequest).listen(3000);
  console.log("Server has started.");
}

exports.start = start;