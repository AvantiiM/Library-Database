var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.login;
handle["/login"] = requestHandlers.login;
handle["/loginverify"] = requestHandlers.loginverify;
handle["/search"] = requestHandlers.search;
//handle["/searchresults"] = requestHandlers.searchresults;
handle["/createUser"] = requestHandlers.createUser;
handle["/addLogin"] = requestHandlers.addLogin;
handle["/adminUI"] = requestHandlers.adminUI;


server.start(router.route, handle);