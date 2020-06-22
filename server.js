var http = require("http");
var fs = require("fs");
var qs = require("querystring");

function servResponse(req, res) {
    var allData = "";

    req.on("data", function (data) {
        allData += data;
    })

    req.on("end", function (data) {
        var obj = qs.parse(allData)
        res.end(JSON.stringify(obj))
    })
}
var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            if (req.url == "/") {
                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url == "/style.css") {
                fs.readFile("static/style.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url.includes(".js")) {
                fs.readFile("static/" + req.url, function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url.includes(".jpg")) {
                fs.readFile("static/" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/jpg' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url.includes(".png")) {
                fs.readFile("static/" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url.indexOf(".mp3") != -1) {
                fs.readFile("static/" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { "Content-type": "audio/mpeg" });
                    res.write(data);
                    res.end();
                })
            }
            break;
        case "POST":
            // przy starcie, na żądanie klienta, zwróć JSON-a z nazwami katalogów zczytane z serwera
            if (req.url == "/postUtwory") {
                servResponse(req, res);
            } else if (req.url == "/postPlaylista") {
                servResponsePlaylist(req, res);
            } else if (req.url == "/upload") {
                servUpload(req, res);
            }
            break;
        default: break;
    }
})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});
