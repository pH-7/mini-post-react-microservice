import React, { userState, useState } from 'react';
import axios from 'axios';

export default() => {
    const [title, setTitle] = useState('');
    
    const submitForm = async (event) => {
        event.preventDefault();

        await axios.post('http://localhost:4000/posts', {
            title
        });

        setTitle('');
    };

    return <div>
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label>Title</label>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="form-control"
                />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
};