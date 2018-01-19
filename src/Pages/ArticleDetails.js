import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import _ from 'lodash';
import readingTime from 'reading-time';
import { Segment, Dimmer, Loader, Header, Label, Icon, Advertisement, Image } from 'semantic-ui-react';
import { fetchArticle, getAccentColor, emptyArticle } from '../Actions/article.Actions';
import Parser from 'html-react-parser';
import Moment from 'react-moment';
import moment from 'moment';
import axios from 'axios';
import AdSense from 'react-adsense';
import { Helmet } from "react-helmet";
import ReactGA from 'react-ga';
import DisqusThread from '../Components/disqusThread';
import SocialShareCompo from "../Components/socialShareCompo";
import { withCookies, Cookies } from 'react-cookie';
import FacebookProvider, { Comments } from 'react-facebook';
import ReactPlaceholder from 'react-placeholder';
import { TextBlock, MediaBlock, TextRow, RectShape, RoundShape } from 'react-placeholder/lib/placeholders';


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

const webClient = axios.create({
    baseURL: "https://mushfiqweb-api.herokuapp.com",
    headers: {
        "Content-Type": "application/json"
    }
});

class ArticleDetails extends Component {

    state = {
        menuFixed: false,
        overlayFixed: false,
        rating: false,
        maxRating: '',
        adsPlacement: '',
        isRated: false,
        ratingDoneMsg: 'Rate The Article!'
    }

    componentDidMount = () => {
        this.props.getAccentColor(this.props.accent);
        if (window.location.hostname !== 'localhost') {
            ReactGA.set({ page: window.location.href });
            ReactGA.pageview(window.location.href);
        }
        setTimeout(() => {
            this.props.fetchArticle(this.props.match.params.articleUrl);
        }, 1000);
    }

    componentWillUnmount = () => {
        this.props.emptyArticle();
    }

    showImages = () => {
        var selfObj = this;
        var allimages = document.getElementsByTagName('img');
        for (var i = 0; i < allimages.length; i++) {
            if (!allimages[i].classList.contains('color-input-img')) {
                allimages[i].classList.add('animated-img');
                allimages[i].classList.add('fadeOut-img');

                if (allimages[i].getAttribute('data-src')) {
                    allimages[i].setAttribute('src', allimages[i].getAttribute('data-src'));
                }

                if (allimages[i].getAttribute('data-width')) {
                    allimages[i].setAttribute('width', allimages[i].getAttribute('data-width'));
                }

                if (allimages[i].getAttribute('data-height')) {
                    allimages[i].setAttribute('height', allimages[i].getAttribute('data-height'));
                }

                allimages[i].classList.remove('fadeOut-img');
                allimages[i].classList.add('fadeIn-img');

                allimages[i].classList.add('ui');
                allimages[i].classList.add('segment');
                allimages[i].classList.add(selfObj.props.accent);
            }
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.article) {

            if (window.CHITIKA === undefined) {
                window.CHITIKA = {
                    'units': []
                };
            };

            var w = 728;
            var h = 90;
            if (window.innerWidth < 850) {
                w = 300;
                h = 600;
            }
            var unit = {
                "calltype": "async[2]",
                "publisher": "mushfiqweb",
                "width": w,
                "height": h,
                "sid": "Chitika Default"
            };

            window.CHITIKA.units.push(unit);
            var placement_id = window.CHITIKA.units.length - 1;
            const adsPlacement = "chitikaAdBlock-" + placement_id;
            this.setState({ adsPlacement: adsPlacement });

            const articleStats = nextProps.article ? readingTime(nextProps.article.articleBody) : '';
            let imgDelay = articleStats.minutes ? Math.ceil(articleStats.minutes) : 2;
            if (imgDelay >= 7) {
                imgDelay = 9;
            }
            imgDelay = imgDelay * 1000;
            setTimeout(() => {
                this.showImages();
            }, imgDelay);

            const cookies = new Cookies();
            if (cookies.get(nextProps.article.articleUrl)) {
                if (nextProps.article.articleUrl === cookies.get(nextProps.article.articleUrl)) {
                    this.setState({
                        isRated: true,
                        ratingDoneMsg: 'Thanks for Rating!'
                    });
                }
            }

            

            if (sessionStorage.getItem('isViewed')) {
                return;
            }
            else {
                sessionStorage.setItem('isViewed', true);
            }
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
                introImage: '',
                articleRatingHigh: '',
                articleRatingLow: '',
                articleRatingAvg: '',
                ratingSum: '0',
                reviewCount: '0',
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
                    articleRatingHigh: nextProps.article.articleRatingHigh,
                    articleRatingLow: nextProps.article.articleRatingLow,
                    articleRatingAvg: nextProps.article.articleRatingAvg,
                    ratingSum: nextProps.article.ratingSum,
                    reviewCount: nextProps.article.reviewCount,
                    introImage: nextProps.article.introImage,
                    metaUrl: nextProps.article.metaUrl,
                    metaTitle: nextProps.article.metaTitle,
                    metaImage: nextProps.article.metaImage,
                    metaDesc: nextProps.article.metaDesc,
                    metaKeys: nextProps.article.metaKeys,
                    serialNumber: nextProps.article.serialNumber,
                    isDeleted: nextProps.article.isDeleted,
                    updatedAt: nextProps.article.updatedAt,
                    createdAt: nextProps.article.createdAt,
                    updatedBy: nextProps.article.updatedBy,
                    createdBy: nextProps.article.createdBy,
                    city: nextProps.article.city,
                    country_code: nextProps.article.country_code,
                    country_name: nextProps.article.country_name,
                    ip: nextProps.article.ip,
                    latitude: nextProps.article.latitude,
                    longitude: nextProps.article.longitude,
                    zip_code: nextProps.article.zip_code
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

    handleRate = (e, { rating, maxRating }) => {
        this.setState({ rating: true });
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
            ratingSum: '0',
            reviewCount: '0',
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
            createdBy: '',
            city: '',
            country_code: '',
            country_name: '',
            ip: '',
            latitude: '',
            longitude: '',
            zip_code: '',
            serialNumber: ''

        }
        if (this.props.article) {

            var ratingSum = Number(this.props.article.ratingSum) + Number(rating);
            var reviewCount = Number(this.props.article.reviewCount) + 1;
            var articleRatingAvg = ratingSum / reviewCount;


            articleObj = {
                _id: this.props.article._id,
                articleTitle: this.props.article.articleTitle,
                articlePostedDate: this.props.article.articlePostedDate,
                articleUpdatedDate: this.props.article.articleUpdatedDate,
                articleWriter: this.props.article.articleWriter,
                articleCategory: this.props.article.articleCategory,
                articleTag: this.props.article.articleTag,
                articleBody: this.props.article.articleBody,
                articleSlug: this.props.article.articleSlug,
                articleTotalViews: Number(this.props.article.articleTotalViews) + 1,
                articleUrl: this.props.article.articleUrl,
                articleTotalComments: this.props.article.articleTotalComments,
                articleRatingHigh: this.props.article.articleRatingHigh ? this.props.article.articleRatingHigh : maxRating,
                articleRatingLow: this.props.article.articleRatingLow ? (Number(this.props.article.articleRatingLow) + 1) : 0,
                articleRatingAvg: articleRatingAvg.toFixed(1),
                ratingSum: ratingSum,
                reviewCount: reviewCount,
                metaUrl: this.props.article.metaUrl,
                metaTitle: this.props.article.metaTitle,
                metaImage: this.props.article.metaImage,
                metaDesc: this.props.article.metaDesc,
                metaKeys: this.props.article.metaKeys,
                isDeleted: this.props.article.isDeleted,
                serialNumber: this.props.article.serialNumber,
                updatedAt: this.props.article.updatedAt,
                createdAt: this.props.article.createdAt,
                updatedBy: this.props.article.updatedBy,
                createdBy: this.props.article.createdBy,
                introImage: this.props.article.introImage,

                city: this.props.article.city,
                country_code: this.props.article.country_code,
                country_name: this.props.article.country_name,
                ip: this.props.article.ip,
                latitude: this.props.article.latitude,
                longitude: this.props.article.longitude,
                zip_code: this.props.article.zip_code
            }
        }
        if (articleObj._id !== '' && articleObj._id) {
            webClient.put('/api/article/' + articleObj._id, articleObj).then(() => {
                this.setState({
                    rating: false,
                    ratingDoneMsg: 'Thanks for Rating!',
                    isRated: true
                });
                const cookies = new Cookies();
                cookies.set(articleObj.articleUrl, articleObj.articleUrl, { path: '/' + articleObj.articleUrl });
            }).catch(() => {
                console.log('Error');
            });
        }
    }

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
            //red orange yellow olive green teal blue violet purple pink brown grey black Web Development
            let colorProfile = 'grey';
            let webLink = 'https://mushfiqweb.com';
            switch (tag.trim()) {
                case 'Windows':
                    colorProfile = 'blue';
                    webLink = 'https://mushfiqweb.com';
                    break;

                case 'Web Development':
                    colorProfile = 'violet';
                    webLink = 'https://mushfiqweb.com';
                    break;
                case 'HTML':
                    colorProfile = 'brown';
                    webLink = 'https://mushfiqweb.com';
                    break;
                case 'Javascript':
                    colorProfile = 'orange';
                    webLink = 'https://mushfiqweb.com';
                    break;
                case 'CSS':
                    colorProfile = 'teal';
                    webLink = 'https://mushfiqweb.com';
                    break;

                case 'Angular':
                    colorProfile = 'brown';
                    webLink = 'https://mushfiqweb.com';
                    break;
                case 'React':
                    colorProfile = 'blue';
                    webLink = 'https://mushfiqweb.com';
                    break;

                case 'Tips':
                    colorProfile = 'green';
                    webLink = 'https://mushfiqweb.com';
                    break;
                case 'ES6':
                    colorProfile = 'yellow';
                    webLink = 'https://mushfiqweb.com';
                    break;

                case 'Build Tool':
                    colorProfile = 'grey';
                    webLink = 'https://mushfiqweb.com';
                    break;
                case 'Freebies':
                    colorProfile = 'purple';
                    webLink = 'https://mushfiqweb.com';
                    break;

                case 'Frontend Develpoment':
                    colorProfile = 'olive';
                    webLink = 'https://mushfiqweb.com';
                    break;
                default:
                    break;
            }
            return (
                <Label style={{ fontSize: '1rem' }} className='Alegreya' key={tag} color={colorProfile}> {tag} </Label>
            );
        });



        {/*
        red            : #B03060;
        orange         : #FE9A76;
        yellow         : #FFD700;
        olive          : #32CD32;
        green          : #016936;
        teal           : #008080;
        blue           : #0E6EB8;
        violet         : #EE82EE;
        purple         : #B413EC;
        pink           : #FF1493;
        brown          : #A52A2A;
        grey           : #A0A0A0;
        black          : #000000;

    
        color = 'orange';
        color = 'violet';
        color = 'teal';
        color = 'brown';
        color = 'green';
        color = 'red';
        color = 'purple';
        color = 'grey';
    
        */}

        var colorSwatchHex = '#0E6EB8';
        if (this.props.accent === 'orange') {
            colorSwatchHex = '#FE9A76';
        }
        else if (this.props.accent === 'teal') {
            colorSwatchHex = '#008080';
        }
        else if (this.props.accent === 'violet') {
            colorSwatchHex = '#EE82EE';
        }
        else if (this.props.accent === 'green') {
            colorSwatchHex = '#016936';
        }
        else if (this.props.accent === 'purple') {
            colorSwatchHex = '#B413EC';
        }
        else if (this.props.accent === 'grey') {
            colorSwatchHex = '#A0A0A0';
        }
        else if (this.props.accent === 'red') {
            colorSwatchHex = '#B03060';
        }
        else if (this.props.accent === 'brown') {
            colorSwatchHex = '#A52A2A';
        }

        const blockquoteStyle = "border-left: 10px solid " + colorSwatchHex + "; border-right: 2px solid " + colorSwatchHex + ";"

        const articleStats = this.props.article ? readingTime(this.props.article.articleBody) : '';

        var imgWidth = window.innerWidth > 850 ? '800px' : '75%';

        const metaStyleRow = {
            display: 'flex', justifyContent: 'space-between', flexDirection: 'row'
        };
        const metaStyleColumn = {
            display: 'flex', justifyContent: 'space-between', flexDirection: 'column'
        };
        return (
            <div >

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

                <ReactPlaceholder style={{ marginBottom: '50px', marginTop: '100px' }} showLoadingAnimation type='text' ready={this.props.article ? true : false} rows={3}>
                    <Header className='slide-in-fwd-top' as='h1' textAlign='center' style={{ margin: '0 auto' }}>
                        <div className='Alegreya' style={{ marginBottom: '15px' }}>
                            {metaTitle}
                        </div>
                    </Header>
                </ReactPlaceholder>

                {
                    this.props.article.articleBody === 'No Article Found' ? <Segment color='red' style={{ marginTop: '200px' }} >
                        <ReactPlaceholder style={{ marginBottom: '50px', marginTop: '50px' }} showLoadingAnimation type='media' ready={this.props.article ? true : false} rows={3}>
                            <Header color='red' className='slide-in-fwd-top' >
                                <div>
                                    <h2>Ahh...awkward!</h2>
                                    <h3>Seems like, it's a <Link className='cool-link pulse' target='_blank' to='http://www.checkupdown.com/status/E004.html'>bad URL</Link>!</h3>
                                    <h1>Please navigate to <Link className='cool-link pulse Alegreya' to='/articles'>Article List</Link>!</h1>
                                </div>
                            </Header>
                        </ReactPlaceholder>
                    </Segment> : <Segment style={StyleSheet.articleContent} color={this.props.accent} >
                            <ReactPlaceholder style={{ marginBottom: '50px', marginTop: '50px' }} showLoadingAnimation type='text' ready={this.props.article ? true : false} rows={3}>
                                <div style={window.innerWidth > 850 ? metaStyleRow : metaStyleColumn} className='slide-in-fwd-top'>
                                    <div style={StyleSheet.articleMeta}>
                                        Tag(s): {tagCompo}
                                    </div>
                                    <div>
                                        <div style={timeStringStyle} className='Alegreya'>
                                            Posted @<span> </span> <strong><Moment format="hh:mm A">{new Date(this.props.article.createdAt)}</Moment> </strong>
                                            On <span> </span><strong><Moment format="DD MMM YYYY">{this.props.article.createdAt}</Moment></strong>
                                        </div>
                                        <div style={timeStringStyle} className='Alegreya'>
                                            <span className="ant-divider" />
                                            <strong>{articleTotalViews}</strong> Views
                                        </div>
                                        <div style={timeStringStyle} className='Alegreya'>
                                            <span className="ant-divider" />
                                            <strong>{Math.ceil(articleStats.minutes)}</strong> Minutes To Read
                                        </div>
                                        <div style={timeStringStyle} className='Alegreya'>
                                            <span className="ant-divider" />
                                            <strong>{this.props.article.articleRatingAvg && this.props.article.articleRatingAvg !== 'NaN' ? this.props.article.articleRatingAvg : '0'}</strong> Rating
                                        </div>
                                    </div>
                                </div>
                            </ReactPlaceholder>

                            <ReactPlaceholder style={{ marginBottom: '50px' }} showLoadingAnimation type='media' ready={this.props.article ? true : false} rows={5}>
                                <div>

                                    <style>{
                                        'img {max-width: ' + imgWidth + ' !important;}  p {text-align: justify;}' +
                                        ' blockquote { ' + blockquoteStyle + '} '
                                    }</style>

                                    <div style={{ display: this.props.article.introImage ? 'flex' : 'none', justifyContent: 'center' }}>
                                        <input className="color-input" type="color" value={colorSwatchHex} disabled />
                                        <img className='color-input-img' src={this.props.article.introImage} />
                                    </div>
                                    {
                                        Parser(htmlToRender)
                                    }
                                </div>
                            </ReactPlaceholder>

                            <ReactPlaceholder style={{ marginBottom: '50px' }} showLoadingAnimation type='media' ready={this.props.article ? true : false} rows={4}>

                                {
                                    metaUrl.length ?
                                        <SocialShareCompo accent={this.props.accent} metaDescription={metaDescription} metaUrl={metaUrl} handleRate={this.handleRate} loading={this.state.rating}
                                            metaTitle={metaTitle} metaImage={metaImage} accent={this.props.accent} ratingDoneMsg={this.state.ratingDoneMsg} isRated={this.state.isRated} />
                                        : <div> </div>
                                }

                                <Segment color={this.props.accent} id={this.state.adsPlacement} />
                            </ReactPlaceholder>
                            <ReactPlaceholder style={{ marginBottom: '50px' }} showLoadingAnimation type='text' ready={this.props.article ? true : false} rows={3}>
                                <DisqusThread id={this.props.article._id} title={metaTitle} path={this.props.article.articleUrl} accent={this.props.accent} />
                            </ReactPlaceholder>
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

export default withCookies(connect(mapStateToProps, { fetchArticle, getAccentColor, emptyArticle })(ArticleDetails));

