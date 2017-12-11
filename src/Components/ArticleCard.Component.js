import React from 'react';
import PropTypes from 'prop-types'
import { Label, Item, } from 'semantic-ui-react'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import readingTime from 'reading-time';

const spanStyle = {
    color: '#a7a7a7',
    fontSize: '15px'
}


const timeStringStyle = {
    ...spanStyle,
    float: 'left',
    fontSize: '12px',
    fontWeight: '800'
}

export default function ArticleCard({ article, deleteStudent, accent }) {

    const articleStats = article.articleBody ? readingTime(article.articleBody) : '';
    const tooltip = "You need approximately " + Math.ceil(articleStats.minutes) + " minutes to read this article"
    return (
        <Item>
            <Item.Content verticalAlign='middle'>
                <Item.Header > <div className='Alegreya' style={{ fontSize: '1.8rem' }}> {article.articleTitle} </div> </Item.Header>
                <Item.Description style={{ textAlign: 'justify' }}>{article.articleSlug}  <span title={tooltip} style={spanStyle}> <strong>  .....{Math.ceil(articleStats.minutes)} minutes to read!</strong> </span>  </Item.Description>
                <Item.Extra>
                    <div>
                        <div style={timeStringStyle}>
                            Posted @ <Moment format="hh:mm a">
                                {article.createdAt}
                            </Moment> On <Moment format="DD MMM YYYY">
                                {article.createdAt}
                            </Moment>
                        </div>
                        <div>
                            <Link to={`/${article.articleUrl}`}>
                                <Label color={accent} style={{ float: 'right', fontFamily: 'Alegreya Sans SC !important' }} className='button-font pulse' content='Read More.'>
                                </Label>
                            </Link>
                        </div>
                    </div>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

ArticleCard.propTypes = {
    article: PropTypes.object.isRequired
}
