const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const PORT = 4002;
const URL = `http://localhost:${PORT}`;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;

        const post = posts[postId];

        post.comments.push({
            id,
            content,
            status
        });
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;

        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });

        comment.status = status;
        comment.content = content;
    }
};

app.get('/posts', (req, res) => {
    res.send(posts);
});


app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);

    res.send(posts);
});

app.listen(PORT, async () => {
    console.log('Litening on ', PORT);

    const res = await axios.get(`${URL}/events`);

    for (let event of res.data) {
        console.log('🚀 Processing the event =>', event.type);

        handleEvent(event.type, event.data);
    }
});
