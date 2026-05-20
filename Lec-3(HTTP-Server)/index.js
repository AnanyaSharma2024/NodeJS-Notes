//HYPERTEXT TRANSFER PROTOCOL SERVER
const http = require('http');
const fs = require('fs');

//req m hum request ke baare m jante h aur res m hum response ke baare m jante h
const myServer = http.createServer((req, res) => {
    //log hum server ke log file m store karne ke liye use karte h taki hume pata chale ki kab kab new request aayi h aur uska time kya tha
    const log = `${Date.now()}: ${req.url} - New request recieved\n`;
    fs.appendFile("log.txt", log, (err, data) => {
        switch (req.url) {
            case "/":
                res.end("home page");
                break;
            case "/about":
                res.end("about page");
                break;
            default:
                res.end("404 page not found");
        }
    });
    //console.log(req.headers);// yeh line tab print hoga jab bhi koi new request aayegi
   
});


myServer.listen(8000, () => console.log("server is running on port 8000"));// yeh line server ko start karne ke liye use hoti h aur jab server start ho jata h toh yeh line print hoti h    