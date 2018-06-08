import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Segment, Dimmer, Loader, Divider, Item, Label, Icon } from 'semantic-ui-react';
import { fetchArticles, getAccentColor, initFetch } from '../Actions/article.Actions';
import ArticleCard from '../Components/ArticleCard.Component'

import ReactGA from 'react-ga';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';

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
        else if (this.props.articles.length > 0) {
            
        }
    }


    componentWillReceiveProps = (nextProps) => {
        if (nextProps.articles.length > 0) {
            if (this.props.articles.length < 5) {
                
            }
        }
    }

    loadMoreArticles = () => {
        var selfObj = this;
        selfObj.props.initFetch();
        if (selfObj.props.articles.length === 0) {
            setTimeout(() => {
                selfObj.props.fetchArticles(5, 0);
            }, 1000);
        }
        else {
            if (selfObj.props.total && selfObj.props.total === selfObj.props.articles.length) {
                //this.props.fetchArticles(this.props.total, 0);
            }
            else {
                setTimeout(() => {
                    selfObj.props.fetchArticles(5, Number(selfObj.props.skip) + 5);
                }, 1000);
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
                    <Divider color='grey' className='fade-in-top' />
                    <div style={{ margin: '0 auto', display: 'table', minHeight:'61px' }} className='fade-in-top'>
                        <div>
                            <Loader active={this.props.loading && (this.props.articles.length > 0)} size='medium' inline className='fade-in-fwd' >
                                fetching more articles...
                            </Loader>
                        </div>
                        <div style={{ display: this.props.loading ? 'none' : 'block' }} className='fade-in-top'>
                            <div style={{ display: this.props.articles.length === this.props.total ? 'none' : 'block' }}>
                                <Label active={!((Number(this.props.skip) + 5) >= this.props.total)} onClick={this.loadMoreArticles} title='Load more articles' as='a' className='pulse Alegreya' color={this.props.accent}> <strong> Load more... </strong> </Label>
                            </div>

                        </div>
                        <div className='fade-in-top Alegreya' style={{ display: this.props.articles.length === this.props.total ? 'block' : 'none', fontSize:'28px' }}>
                            <strong>
                                Loaded Everything <Icon name='smile' size='big' color={this.props.accent} />
                            </strong>
                        </div>
                    </div>
                </Segment>             
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

export default connect(mapStateToProps, { fetchArticles, getAccentColor, initFetch })(ArticleViewer);

