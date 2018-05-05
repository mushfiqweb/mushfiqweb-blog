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
        adsPlacementOne: '',
        adsPlacementTwo: '',
        adsPlacementThree: '',
        adsLoaded: false,
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
            this.loadAds();
        }
    }

    modifyAdsStyle = () => {
        if (document.getElementsByClassName('chitikaAdBlock')[0] && document.getElementsByClassName('chitikaAdBlock')[1] && document.getElementsByClassName('chitikaAdBlock')[2]) {
            document.getElementsByClassName('chitikaAdBlock')[0].removeAttribute('width');
            document.getElementsByClassName('chitikaAdBlock')[1].removeAttribute('width');
            document.getElementsByClassName('chitikaAdBlock')[2].removeAttribute('width');
            this.setState({ adsLoaded: true });
        }
    }



    componentWillReceiveProps = (nextProps) => {
        if (nextProps.articles.length > 0) {
            if (this.props.articles.length < 5) {
                this.loadAds();
            }
        }
    }

    loadAds = () => {
        if (window.CHITIKA === undefined) {
            window.CHITIKA = {
                'units': []
            };
        };
        if (this.props.articles.length < 5) {
            var unit = {
                "calltype": "async[2]",
                "publisher": "mushfiqweb",
                "width": 550,
                "height": 250,
                "sid": "Chitika Default"
            };
            window.CHITIKA.units.push(unit);

            var unit = {
                "calltype": "async[2]",
                "publisher": "mushfiqweb",
                "width": 550,
                "height": 250,
                "sid": "Chitika Default"
            };
            window.CHITIKA.units.push(unit);

            var unit = {
                "calltype": "async[2]",
                "publisher": "mushfiqweb",
                "width": 550,
                "height": 250,
                "sid": "Chitika Default"
            };
            window.CHITIKA.units.push(unit);
        }

        var placement_id = window.CHITIKA.units.length - 1;

        const adsPlacementOne = "chitikaAdBlock-" + placement_id;
        placement_id = placement_id - 1;

        const adsPlacementTwo = "chitikaAdBlock-" + placement_id;
        placement_id = placement_id - 1;

        const adsPlacementThree = "chitikaAdBlock-" + placement_id;
        this.setState({ adsPlacementOne: adsPlacementOne, adsPlacementTwo: adsPlacementTwo, adsPlacementThree: adsPlacementThree });
        setTimeout(() => {
            this.modifyAdsStyle();
        }, 2000);

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

        const adsStyleRow = {
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'space-between'
        };
        const adsStyleColumn = {
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'space-between'
        };
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

