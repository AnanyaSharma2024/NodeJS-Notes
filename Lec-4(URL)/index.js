const http = require('http');
const fs = require('fs');
const url = require('url');

//req m hum request ke baare m jante h aur res m hum response ke baare m jante h
const myServer = http.createServer((req, res) => {
    //log hum server ke log file m store karne ke liye use karte h taki hume pata chale ki kab kab new request aayi h aur uska time kya tha
    const log = `${Date.now()}: ${req.url} - New request recieved\n`;
    
    // url.parse() method se hum url ko parse kar sakte h aur uske different parts ko access kar sakte h
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            console.error("Failed to write log:", err);
        }

        switch (myUrl.pathname) {
            case "/":
                res.end("home page");
                break;
            case "/about":
                const username = myUrl.query.name; // yeh line query parameter se name ko access karne ke liye use hoti h
                res.end(`i am ${username}`);
                break;
            default:
                res.end("404 page not found");
        }
    });
    //console.log(req.headers);// yeh line tab print hoga jab bhi koi new request aayegi
   
});

let port = Number(process.env.PORT || 8000);
const startServer = () => {
    myServer.listen(port, () => console.log(`server is running on port ${port}`));
};

myServer.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.warn(`Port ${port} is already in use. Trying port ${port + 1}...`);
        port += 1;
        startServer();
    } else {
        console.error("Server error:", err);
        process.exit(1);
    }
});

startServer(); // yeh line server ko start karne ke liye use hoti h aur jab server start ho jata h toh yeh line print hoti h