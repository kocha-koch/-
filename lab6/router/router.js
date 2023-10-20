const express = require('express');

const router = express.Router();
const jsonParser = express.json();

let commentsObj = [];
let comments = [];
let user = { amount_of_requests: 0 };

router.get("/hello", helloGetHandler);
router.get("/stats", statsGetHandler);
router.get("/comments", commentsGetHandler);
router.post("/comments", jsonParser, commentsPostHandler);


function helloGetHandler(req, res) {
    user.amount_of_requests++;
    res.end("Hello World!\n");
}

function statsGetHandler(req, res) {
    user.amount_of_requests++;
    res.end(`<table>
    <tr><td>User-agent:</td><td>Request:</td></tr>
    <tr><td>${req.headers["user-agent"]}</td><td>${user.amount_of_requests}</td></tr>
</table>`);
}

function commentsGetHandler(req, res)
{
    user.amount_of_requests++;
    let temp = `<p>Comments</p><ol>`;
    commentsObj.forEach(element => {
        temp += `<li>${element.user}: ${element.comment}</li>`
    });
    temp += `</ol>`;
    res.end(temp);
}

function commentsPostHandler(req, res) {
    user.amount_of_requests++;
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
            res.end("{comments: " + comments.toString() + "}");
            console.log(comments);
        });
}

module.exports = router;