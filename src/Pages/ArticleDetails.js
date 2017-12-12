import React, { Component } from 'react'
import { connect } from 'react-redux';
import _ from 'lodash';
import { Segment, Dimmer, Loader, Header, Label } from 'semantic-ui-react';
import { fetchArticle, getAccentColor } from '../Actions/article.Actions';
import Parser from 'html-react-parser';

import { Helmet } from "react-helmet";
import ReactGA from 'react-ga';
import DisqusThread from '../Components/disqusThread';
import SocialShareCompo from "../Components/socialShareCompo";

const StyleSheet = {
    articleContent: {
        width: '69vmax',
        margin: '0 auto',
        padding: '1vmax'
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
        overlayFixed: false
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


    render() {


        const htmlToRender = this.props.article ? this.props.article.articleBody : '<h1>fetching the article...</h1>';
        const metaTitle = this.props.article ? this.props.article.metaTitle + " | mushfiqWEB - mushfiqur's blog" : "mushfiqWEB - mushfiqur's blog";
        const metaDescription = this.props.article ? this.props.article.metaDesc : "mushfiqWEB - mushfiqur's blog";
        const metaUrl = this.props.article ? this.props.article.metaUrl : "https://mushfiqweb.com";
        const metaImage = this.props.article ? this.props.article.metaImage : "https://mushfiqweb.com/article.png";

        const tagsArray = this.props.article.articleCategory ? this.props.article.articleCategory.split(',') : [];
        const tagCompo = _.map(tagsArray, function (tag, idx) {

            let colorProfile = 'grey';
            //Javascript, Angular, React, Tips, ES6, Build Tool, Freebies
            /* 
            @red            : #B03060;
            @orange         : #FE9A76;
            @yellow         : #FFD700;
            @olive          : #32CD32;
            @green          : #016936;
            @teal           : #008080;
            @blue           : #0E6EB8;
            @violet         : #EE82EE;
            @purple         : #B413EC;
            @pink           : #FF1493;
            @brown          : #A52A2A;
            @grey           : #A0A0A0;
            @black          : #000000;
            */
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
            return (<Label key={tag} color={colorProfile}>{tag}</Label>);
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
                    
                    </Helmet> : ''
                }


                <Dimmer active={this.props.loading} inverted>
                    <Loader size='large'>
                        fetching the article...
                        </Loader>
                </Dimmer>
                <Header as='h1' textAlign='center' style={{ maxWidth: '69vmax', margin: '0 auto' }}>
                    <div style={{ marginBottom: '15px' }}>
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

                            <div style={StyleSheet.articleMeta}>
                                Tag(s): {tagCompo}
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
                                <DisqusThread id={this.props.article._id}
                                    title={metaTitle}
                                    path={this.props.article.articleUrl} />
                            </div>
                            <div style={{ display: 'block', height: '35px' }}>

                            </div>

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

