const express = require('express');
const bodyParser = require('body-parser');
const httpStatus = require('http-status-codes');
const { randomBytes } = require('crypto');
const cors = requirs('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;

    // Send back the entire array of comments
    res.status(httpStatus.CREATED).send(comments);

});

app.listen(4001, () => {
    console.log('Listening on 4001');
});