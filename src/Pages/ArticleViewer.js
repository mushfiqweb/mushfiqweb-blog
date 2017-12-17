import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Segment, Dimmer, Loader, Divider, Item, Label, Icon } from 'semantic-ui-react';
import { fetchArticles, getAccentColor } from '../Actions/article.Actions';
import ArticleCard from '../Components/ArticleCard.Component'

import ReactGA from 'react-ga';

class ArticleViewer extends Component {


    state = {
        anime: 'fadeIn',
        headerColor: 'green'
    }



    componentDidMount = () => {
        this.props.getAccentColor(this.props.accent);
        if (window.location.hostname !== 'localhost') {
            ReactGA.set({ page: window.location.href });
            ReactGA.pageview(window.location.href);
        }

        if (this.props.articles.length === 0) {
            this.props.fetchArticles(5, 0);
        }
        /*
                if (this.props.articles.length === 0) {
                    this.props.fetchArticles(5, 0);
                }
                else {
                    if (this.props.total && this.props.total === this.props.articles.length) {
                        //this.props.fetchArticles(this.props.total, 0);
                    }
                    else {
                        this.props.fetchArticles(5, Number(this.props.skip) + 5);
                    }
                }
        */
    }

    loadMoreArticles = () => {
        var selfObj = this;
        if (selfObj.props.articles.length === 0) {
            selfObj.props.fetchArticles(5, 0);
        }
        else {
            if (selfObj.props.total && selfObj.props.total === selfObj.props.articles.length) {
                //this.props.fetchArticles(this.props.total, 0);
            }
            else {
                selfObj.props.fetchArticles(5, Number(selfObj.props.skip) + 5);
            }
        }
    }


    render() {

        return (
            <div>

                <Segment color={this.props.accent} style={{ minHeight: '80vh', margin: '0 auto' }}>

                    <Dimmer active={this.props.loading && (this.props.articles.length === 0)} inverted>
                        <Loader size='large'>
                            fetching articles...
                        </Loader>
                    </Dimmer>

                    <div style={{ margin: '0 auto', display: 'table' }}>
                        <Item.Group relaxed divided unstackable>
                            {
                                this.props.articles.length > 0 ? this.props.articles.map(article => {
                                    return (
                                        <ArticleCard key={article._id} article={article} accent={this.props.accent} />
                                    )
                                }) : ''
                            }
                        </Item.Group>
                    </div>
                    <Divider color='grey' />

                    <div style={{ margin: '0 auto', display: 'table' }}>
                        <div>
                            <Loader active={this.props.loading && (this.props.articles.length > 0)} size='medium' inline>
                                fetching more articles...
                            </Loader>
                        </div>
                        <div style={{ display: this.props.loading ? 'none' : 'block' }}>
                            <div style={{ display: this.props.articles.length === this.props.total ? 'none' : 'block' }}>
                                <Label active={!((Number(this.props.skip) + 5) >= this.props.total)} onClick={this.loadMoreArticles} title='Load more articles' as='a' className='pulse Alegreya' color={this.props.accent}> <strong> Load more... </strong> </Label>
                            </div>

                        </div>
                        <div style={{ display: this.props.articles.length === this.props.total ? 'block' : 'none' }}>
                            <strong>
                                Loaded everything <Icon name='smile' size='large' color={this.props.accent} />
                            </strong>
                        </div>
                    </div>
                </Segment>
                <div style={{ display: 'block', height: '35px', marginTop: '32px' }}>

                </div>

            </div >
        );
    }
}
function mapStateToProps(state) {
    return {
        articles: state.articleStore.articles,
        skip: state.articleStore.skip,
        total: state.articleStore.total,
        loading: state.articleStore.loading,
        accent: state.articleStore.AppAccentColor
    }
}

export default connect(mapStateToProps, { fetchArticles, getAccentColor })(ArticleViewer);

