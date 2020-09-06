const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const getStatusMessage = () => {
            return data.content.includes('orange') ? 'rejected' : 'approved';
        }

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status: getStatusMessage(),
                content: data.content
            }
        });


    }
});

app.listen(4003, () => {
    console.log('Listening on 4003');
});

