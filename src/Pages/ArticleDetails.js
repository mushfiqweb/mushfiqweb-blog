import React, { Component } from 'react'
import { connect } from 'react-redux';
import _ from 'lodash';
import { Segment, Dimmer, Loader, Header, Label, Icon, Rating } from 'semantic-ui-react';
import { fetchArticle, getAccentColor } from '../Actions/article.Actions';
import Parser from 'html-react-parser';
import axios from 'axios';
import AdSense from 'react-adsense';
import { Helmet } from "react-helmet";
import ReactGA from 'react-ga';
import DisqusThread from '../Components/disqusThread';
import SocialShareCompo from "../Components/socialShareCompo";

const StyleSheet = {
    articleContent: {        
        margin: '0 auto',
        padding: '1vmax',
        minHeight: '40vh'
    },
    articleMeta: {
        marginBottom: '0.7vmax',
        fontSize: '95%',
        fontWeight: '600'
    }
}


class ArticleDetails extends Component {

    state = {
        menuFixed: false,
        overlayFixed: false,
        rating: '',
        maxRating: ''

    }

    componentDidMount = () => {
        this.props.getAccentColor(this.props.accent);
        if (window.location.hostname !== 'localhost') {
            ReactGA.set({ page: window.location.href });
            ReactGA.pageview(window.location.href);
        }
        this.props.fetchArticle(this.props.match.params.articleUrl);
    }


    handleOverlayRef = (c) => {
        const { overlayRect } = this.state

        if (!overlayRect) this.setState({ overlayRect: _.pick(c.getBoundingClientRect(), 'height', 'width') })
    }

    componentWillReceiveProps = (nextProps) => {
        console.log('CWRP');
        console.log(nextProps);
        if (nextProps.article) {
            const webClient = axios.create({
                baseURL: "https://mushfiqweb-api.herokuapp.com",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            var articleObj = {
                articleTitle: '',
                articlePostedDate: '',
                articleUpdatedDate: '',
                articleWriter: '',
                articleCategory: '',
                articleTag: '',
                articleBody: '',
                articleSlug: '',
                articleTotalViews: '',
                articleUrl: '',
                articleTotalComments: '',
                articleRatingHigh: '',
                articleRatingLow: '',
                articleRatingAvg: '',
                metaUrl: '',
                metaTitle: '',
                metaImage: '',
                metaDesc: '',
                metaKeys: '',
                _id: '',
                isDeleted: 'false',
                updatedAt: '',
                createdAt: '',
                updatedBy: '',
                createdBy: ''

            }
            if (nextProps.article) {
                articleObj = {
                    _id: nextProps.article._id,
                    articleTitle: nextProps.article.articleTitle,
                    articlePostedDate: nextProps.article.articlePostedDate,
                    articleUpdatedDate: nextProps.article.articleUpdatedDate,
                    articleWriter: nextProps.article.articleWriter,
                    articleCategory: nextProps.article.articleCategory,
                    articleTag: nextProps.article.articleTag,
                    articleBody: nextProps.article.articleBody,
                    articleSlug: nextProps.article.articleSlug,
                    articleTotalViews: Number(nextProps.article.articleTotalViews) + 1,
                    articleUrl: nextProps.article.articleUrl,
                    articleTotalComments: nextProps.article.articleTotalComments,
                    articleRatingHigh: nextProps.article.articleRatingHigh ? nextProps.article.articleRatingHigh : 0,
                    articleRatingLow: nextProps.article.articleRatingLow ? nextProps.article.articleRatingLow : 0,
                    articleRatingAvg: nextProps.article.articleRatingAvg ? nextProps.article.articleRatingAvg : 0,
                    metaUrl: nextProps.article.metaUrl,
                    metaTitle: nextProps.article.metaTitle,
                    metaImage: nextProps.article.metaImage,
                    metaDesc: nextProps.article.metaDesc,
                    metaKeys: nextProps.article.metaKeys,

                    isDeleted: nextProps.article.isDeleted,
                    updatedAt: nextProps.article.updatedAt,
                    createdAt: nextProps.article.createdAt,
                    updatedBy: nextProps.article.updatedBy,
                    createdBy: nextProps.article.createdBy
                }
            }

            if (articleObj._id !== '' && articleObj._id) {
                webClient.put('/api/article/' + articleObj._id, articleObj).then(() => {
                    console.log('Done');
                }).catch(() => {
                    console.log('Error');
                });
            }
        }
    }

    handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating })

    render() {
        const articleSlug = this.props.article ? this.props.article.articleSlug : '<h1> </h1>';
        const htmlToRender = this.props.article ? this.props.article.articleBody : '<div style="min-height:60vh;"><h1>fetching the article...</h1></div>';
        const metaTitle = this.props.article ? this.props.article.metaTitle + " | mushfiqWEB - mushfiqur's blog" : "mushfiqWEB - mushfiqur's blog";
        const metaDescription = this.props.article ? this.props.article.metaDesc : "mushfiqWEB - mushfiqur's blog";
        const metaUrl = this.props.article ? this.props.article.metaUrl : "https://mushfiqweb.com";
        const metaImage = this.props.article ? this.props.article.metaImage : "https://i.imgur.com/mH4iRva.png";
        const metaKeys = this.props.article ? this.props.article.metaKeys : "https://mushfiqweb.com/article.png";

        const articleTotalViews = this.props.article.articleTotalViews;
        var jsonLD = {
            headline: metaTitle,
            author: {
                '@type': 'Person',
                'name': 'Mushfiqur Rahman Shishir'
            },
            publisher: {
                '@type': 'Organization',
                'name': 'mushfiqWEB.com - blog of a tech geek, javascript developer, photographer and music enthusiast',
                'logo': {
                    '@type': 'ImageObject',
                    'url': 'https://mushfiqweb.com/favicon.ico'
                }
            },
            description: articleSlug,
            image: metaImage,
            keywords: metaKeys,
            url: metaUrl,
            datePublished: this.props.article ? this.props.article.createdAt : '',
            dateCreated: this.props.article ? this.props.article.createdAt : '',
            articleBody: articleSlug,
            '@type': 'NewsArticle',
            '@context': 'http://schema.org'

        }

        const open = this.props.article ? true : false;

        const tagsArray = this.props.article.articleCategory ? this.props.article.articleCategory.split(',') : [];
        const tagCompo = _.map(tagsArray, function (tag, idx) {

            let colorProfile = 'grey';
            switch (tag.trim()) {
                case 'Javascript':
                    colorProfile = 'orange'
                    break;
                case 'CSS':
                    colorProfile = 'teal'
                    break;

                case 'Angular':
                    colorProfile = 'brown'
                    break;
                case 'React':
                    colorProfile = 'blue'
                    break;

                case 'Tips':
                    colorProfile = 'red'
                    break;
                case 'ES6':
                    colorProfile = 'yellow'
                    break;

                case 'Build Tool':
                    colorProfile = 'grey'
                    break;
                case 'Freebies':
                    colorProfile = 'purple'
                    break;

                case 'Frontend Develpoment':
                    colorProfile = 'olive';
                    break;
                default:
                    break;
            }
            return (<Label style={{ fontSize: '1rem' }} className='Alegreya' key={tag} color={colorProfile}>{tag}</Label>);
        });

        return (
            <div>

                {
                    this.props.article ? <Helmet>
                        <title>{metaTitle}</title>
                        <meta name="keywords" content={this.props.article.metaKeys} />
                        <meta name="description" content={metaDescription} />
                        <meta property="og:url" content={metaUrl} />
                        <meta property="og:title" content={metaTitle} />
                        <meta property="og:image" content={metaImage} />
                        <meta property="og:description" content={metaDescription} />
                        <meta property="og:site_name" content="mushfiqWEB - Mushfiqur's Blog" />
                        <meta property="og:locale" content="en_US" />
                        <meta property="og:type" content="website" />
                        <meta property="twitter:url" content={metaUrl} />
                        <meta name="twitter:card" content="summary" />
                        <meta name="twitter:site" content="@mushfiqweb" />
                        <meta name="twitter:creator" content="@mushfiqweb" />
                        <meta name="twitter:title" content={metaTitle} />
                        <meta name="twitter:description" content={metaDescription} />
                        <meta name="twitter:image" content={metaImage} />

                        <script type="application/ld+json">
                            {JSON.stringify(jsonLD)}
                        </script>


                    </Helmet> : ''
                }


                <Dimmer active={this.props.loading} inverted>
                    <Loader size='large'>
                        fetching the article...
                        </Loader>
                </Dimmer>
                <Header as='h1' textAlign='center' style={{ margin: '0 auto' }}>
                    <div className='Alegreya' style={{ marginBottom: '15px' }}>
                        {metaTitle}
                    </div>

                </Header>
                {
                    this.props.article.articleBody === 'No Article Found' ? <Segment color='red' style={{ marginTop: '200px', textAlign: 'center' }} > <Header color='red' >
                        <div>
                            <h1> Failed to pull article! Try reloading the page!</h1>
                        </div>
                    </Header>
                    </Segment> : <Segment style={StyleSheet.articleContent} color={this.props.accent} >
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={StyleSheet.articleMeta}>
                                    Tag(s): {tagCompo}
                                </div>
                                <div className='Alegreya'>
                                    Views: <strong> {articleTotalViews} </strong>
                                </div>
                            </div>

                            <div>
                                <style>{
                                    'img {max-width: 60% !important;}  p {text-align: justify;}'
                                }</style>
                                {
                                    Parser(htmlToRender)
                                }
                            </div>
                            <div>
                                {
                                    metaUrl.length ?
                                        <SocialShareCompo metaDescription={metaDescription} metaUrl={metaUrl} metaTitle={metaTitle} metaImage={metaImage} accent={this.props.accent} />
                                        : <div> </div>
                                }
                            </div>
                            <div>
                                <Rating maxRating={5} onRate={this.handleRate} />
                            </div>
                            <div></div>
                            <div> <DisqusThread id={this.props.article._id} title={metaTitle} path={this.props.article.articleUrl} /></div>
                            <div style={{ display: 'block', height: '35px' }}></div>
                        </Segment>
                }
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        article: state.articleStore.article,
        loading: state.articleStore.loading,
        accent: state.articleStore.AppAccentColor
    }
}

export default connect(mapStateToProps, { fetchArticle, getAccentColor })(ArticleDetails);

