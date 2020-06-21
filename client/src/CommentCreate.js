import React, { useState } from 'react';
import axios from 'axios';

export default ({ postId }) => {
    const apiUrl = 'http://localhost:4001';
    const [content, setContent] = useState(''); // It comes from `useState` and we give a default empty string value

    const submitForm = async (event) => {
        event.preventDefault();

        await axios.post(`${apiUrl}/posts/${postId}/comments`, {
            content
        });

        setContent('');
    };

    return (
        <div>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};
