import React from 'react';
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function ArticleEdit({ article }) {
    return (
        <Card style={{ width: '80vw', textAlign: 'left' }}>
            <Card.Content>
                <Card.Header>
                    <div>

                        <Link to={`/pliste/${article._id}`}>
                            {article.articleTitle}
                        </Link>
                    </div>
                </Card.Header>
            </Card.Content>
        </Card>
    )
}

ArticleEdit.propTypes = {
    article: PropTypes.object.isRequired
}
