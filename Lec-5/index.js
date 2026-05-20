const http = require('http');
const fs = require('fs');
const url = require('url');

const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.method} ${req.url} - New request recieved\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile("log.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case "/":
                if(req.method === "GET") res.end("home page");
                break;
            case "/about":
                const username = myUrl.query.myname; 
                res.end(`i am ${username}`);
                break;
            case "/search":
                const search = myUrl.query.search_query;
                res.end(`You searched for: ${search}`);
                break;
            case "/signup":
                if(req.method === "GET") res.end("signup page");
                else if (req.method === "POST"){
                    //DB QUERY
                     res.end("signup form submitted");
                }
                break;
            default:
                res.end("404 page not found");
        }
    });
});

myServer.listen(8000, () => {
    console.log("server is running on port 8000");
});