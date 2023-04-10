function route(handle, pathname, response, postData, userData) {
    console.log("About to route a request for " + pathname);
    switch(pathname) {
        case '/loginverify': 
        case '/bookReserve': 
        case '/mediaReserve': 
        case '/electronicReserve':handle[pathname](response, postData, userData); break;
        default:
            if (typeof handle[pathname] === 'function') {
                handle[pathname](response, postData);
            } else {
                console.log("No request handler found for " + pathname);
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.write("404 Not found");
                response.end();
            }        
    }
}

exports.route = route;