import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Segment, Dimmer, Loader,  Divider } from 'semantic-ui-react';
import { fetchArticles } from '../Actions/article.Actions';

import ArticleEdit from '../Components/ArticleEdit'
import ReactGA from 'react-ga';

class ArticleListEdit extends Component {


    state = {
        anime: 'fadeIn',
        headerColor: 'green'
    }

    componentDidMount = () => {
        if (window.location.hostname !== 'localhost') {
            ReactGA.set({ page: window.location.href });
            ReactGA.pageview(window.location.href);
        }
        this.props.fetchArticles();
    }


    render() {
        return (
            <div>
                <Segment color={this.state.headerColor} style={{ minHeight: '60vh' }}>
                    <Dimmer active={this.props.loading} inverted>
                        <Loader size='large'>
                            Getting there...
                        </Loader>
                    </Dimmer>

                    <div>
                        {
                            this.props.articles.length > 0 ? this.props.articles.map(article => {
                                return (
                                    <ArticleEdit key={article._id} article={article} />
                                )
                            }) : ''
                        }
                    </div>

                    <Divider color='grey' />
                </Segment>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        articles: state.articleStore.articles,
        loading: state.articleStore.loading
    }
}

export default connect(mapStateToProps, { fetchArticles })(ArticleListEdit);

