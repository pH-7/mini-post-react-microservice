const express = require('express');
const bodyParser = require('body-parser');
const httpStatus = require('http-status-codes');
const axios = require('axios');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id,
        title
    };

    // Call our event-bus, with post data 🚌
    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    });

    res.status(httpStatus.CREATED).send(posts[id]);
});


app.post('/events', (req, res) => {
    console.log('Event Received: ', req.body.type);

    res.send({});
});

app.listen(4000, () => {
    console.log('Listening on 4000');
});
