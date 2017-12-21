import React from 'react';
import PropTypes from 'prop-types'
import { Label, Item, } from 'semantic-ui-react'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import readingTime from 'reading-time';

const spanStyle = {
    color: '#a7a7a7',
    fontSize: '12px'
}


const timeStringStyle = {
    ...spanStyle,
    float: 'left',
    fontSize: '12px',
    fontWeight: '800'
}

const viewsStyle = {
    ...timeStringStyle
}

export default function ArticleCard({ article, deleteStudent, accent }) {

    const articleStats = article.articleBody ? readingTime(article.articleBody) : '';
    const tooltip = "You need approximately " + Math.ceil(articleStats.minutes) + " minutes to read this article";

    const styleSheet = {
        LinkStyle: {
            fontSize: '1.8rem',
            fontWeight: '600',
            color: 'black'
        }
    }

    return (
        <Item>
            <Item.Content verticalAlign='middle'>
                <Item.Header > <div color={accent} style={{ fontSize: '2rem' }} className='cool-link Alegreya'>
                    <Link to={`/${article.articleUrl}`}>
                        <span style={styleSheet.LinkStyle}>
                            {article.articleTitle}
                        </span>
                    </Link>
                </div> </Item.Header>
                <Item.Description style={{ textAlign: 'justify' }}>{article.articleSlug}  <span className='Alegreya' title={tooltip} style={spanStyle}> <strong>  .....{Math.ceil(articleStats.minutes)} minutes to read!</strong> </span>  </Item.Description>
                <Item.Extra>
                    <div>
                        <div style={timeStringStyle} className='Alegreya'>
                            Posted @<span> </span> <strong style={{ fontSize: '13px' }}><Moment format="hh:mm a">{new Date(article.createdAt)}</Moment> </strong>
                            On <span> </span><strong style={{ fontSize: '13px' }}><Moment format="DD MMM YYYY">{article.createdAt}</Moment></strong>  
                        </div>

                        <div style={viewsStyle} className='Alegreya'>
                            <span className="ant-divider" />
                            {article.articleTotalViews} Views
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
