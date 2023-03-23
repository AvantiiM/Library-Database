var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.login; //http://localhost:3000/login
handle["/login"] = requestHandlers.login; //http://localhost:3000/login
handle["/loginverify"] = requestHandlers.loginverify; //not an actual page
handle["/search"] = requestHandlers.search; //http://localhost:3000/search
//handle["/searchresults"] = requestHandlers.searchresults;
handle["/createUser"] = requestHandlers.createUser; //http://localhost:3000/createUser
handle["/addLogin"] = requestHandlers.addLogin; //not an actual page
handle["/adminUI"] = requestHandlers.adminUI; //http://localhost:3000/adminUI
handle["/BookEntry"] = requestHandlers.Entry; //http://localhost:3000/Entry


server.start(router.route, handle);