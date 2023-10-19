const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;
let commentsObj = [];
let comments = [];
let user = { amount_of_requests: 0 };

const server = http.createServer((req, res) => {
    user.amount_of_requests++;
    res.setHeader("Content-Type", "text/plain");
    switch (req.method) {
        case "GET":
            getHandler(req, res);
            break;
        case "POST":
            postHandler(req, res);
            break;
        default:
            errorHandler(res);
            break;
    }
    res.statusCode = 200;
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function getHandler(req, res) {
    switch (req.url) {
        case "/":
            mainGetHandler(res);
            break;
        case "/stats":
            statsGetHandler(req, res);
            break;
        default:
            errorHandler(res);
            break;
    }
}

function mainGetHandler(res) {
    res.end("Hello world!\n");
}

function statsGetHandler(req, res) {
    res.end(`<table>
    <tr><td>User-agent:</td><td>Request:</td></tr>
    <tr><td>${req.headers["user-agent"]}</td><td>${user.amount_of_requests}</td></tr>
</table>`);
}

function errorHandler(res) {
    res.end("400");
}

function postHandler(req, res) {
    switch (req.url) {
        case "/comments":
            commentsPostHandler(req, res);
            break;
        default:
            errorHandler(res);
            break;
    }
}

function commentsPostHandler(req, res) {
    let body = [];
    req
        .on("data", (chunk) => {
            body.push(chunk);
        })
        .on("end", () => {
            body = Buffer.concat(body).toString();
            if (!body)
                body = "{}";
            let temp = JSON.parse(body);
            commentsObj.push(temp)
            comments.push(temp.comment);
            res.end("{comment: " + comments.toString() + "}");
            console.log(comments);
        });
}