import React from 'react';

export default ({ comments }) => {
    const renderedComments = comments.map(comment => {

        const getContent = ((comment) => {
            switch (comment.status) {
                case 'approved':
                    return comment.content;

                case 'rejected':
                    return 'This comment is awaiting moderation.';

                case 'pending':
                    return 'This comment is awaiting moderation.';

                case 'rejected':
                    return 'This comment has been rejected.';

                default:
                    return comment.content;

            }
        })();

        return <li key={comment.id}>{getContent}</li>
    });

    return (
        <ul>
            {renderedComments}
        </ul>
    )
}
