const express = require('express');

const router = express.Router();
const jsonParser = express.json();

let bodies = [];
let comments = [];
let user = { amount_of_requests: 0 };


router.use((req, res, next) => {
    const apiKey = req.query.apiKey;
    if (apiKey !== "api") {
        next()
    } else {
        res.status(403).send("Fobidden")
    }
})


router.get("/hello", helloGetHandler);
router.get("/stats", statsGetHandler);
router.get("/comments", commentsGetHandler);
router.post("/comments", jsonParser, commentsPostHandler);

function helloGetHandler(req, res) {
    user.amount_of_requests++;
    res.send("Hello World!\n");
}

function statsGetHandler(req, res) {
    user.amount_of_requests++;
    res.send(`<table>
    <tr><td>User-agent:</td><td>Request:</td></tr>
    <tr><td>${req.headers["user-agent"]}</td><td>${user.amount_of_requests}</td></tr>
</table>`);
}

function commentsGetHandler(req, res)
{
    user.amount_of_requests++;
    if (bodies.length == 0)
    {
        res.send("No comments left");
    }
    let temp = `<p>Comments</p><ol>`;
    bodies.forEach(element => {
        temp += `<li>${element.user}: ${element.comment}</li>`
    });
    temp += `</ol>`;
    res.send(temp);
}

function commentsPostHandler(req, res) {
    user.amount_of_requests++;
    let bodyTemp = req.body;
    if (!("comment" in bodyTemp) || !("user" in bodyTemp))
    {
        res.status('404').send(`comment or user not found in request body`);
        return;
    }
    if (bodyTemp.comment == "" || bodyTemp.user == "")
    {
        res.status('404').send("comment or user is empty in request body");
        return;
    }
    bodies.push(bodyTemp);
    comments.push(bodyTemp.comment);
    res.send(comments);
}

module.exports = router;