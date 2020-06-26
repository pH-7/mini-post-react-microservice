const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const PORT = 4002;

app.get('/posts', (req, res) => {
    res.send(posts);
});


app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId } = data;

        const post = posts[postId];

        post.comments.push({ id, content });
    }

    res.send({}); // Send an empty object. Just for saying we received the object
});

app.listen(PORT, () => {
    console.log('Litening on ', PORT);
});
