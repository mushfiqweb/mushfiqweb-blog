import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";

import { Message, Divider, Visibility, Menu, Container, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import { emptyArticle, getAccentColor } from './Actions/article.Actions';
import { connect } from 'react-redux';

import Home from "./Pages/landingPage";
import Missed from "./Components/missed";
import ArticleDetails from "./Pages/ArticleDetails";
import ArticleViewer from './Pages/ArticleViewer';
import AddArticle from './Pages/article.Add';
import FroalaEditor from "./Pages/FroalaEditor";
import ArticleListEdit from './Pages/ArticleListEdit';
import ImageColor from './Pages/ImageColor';
import InstaFeed from './Pages/InstaFeed';
import GithubTrends from './Pages/Github.Trends';
import { SocialLinks } from './Utils/constants';
import TransitionablePortalExampleControlled from './Pages/Transition.Portal';

import { AnimatedSwitch, AnimatedRoute } from 'react-router-transition';
import { Scrollbars } from 'react-custom-scrollbars';
const socialIconSize = 'small';
const style = {

    h3: {
        fontSize: '2em',
        margin: '0px 0px -40px 0px'
    },
    editorHeight: {
        height: '50vh'
    },
    menuItem: {
        fontSize: '30px',
        fontWeight: '600',
        padding: '0px'
    },
    smallMenuItem: {
        fontSize: '16px',
        fontWeight: '600',
    }
}



const menuStyle = {
    marginBottom: '-17px',
    borderRadius: 0,
    boxShadow: 'none',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const menuStyleBottom = {
    borderRadius: 0,
    boxShadow: 'none',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}


const fixedMenuStyle = {
    backgroundColor: '#fff',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

            menuFixed: false,
            overlayFixed: false,
            activeItem: 'home',
            isAnimeNow: false,
            headerColor: 'teal',
            blogColor: 'purple',
            resumeColor: 'red'

        };
    }

    componentWillMount = () => {
    }

    handleOverlayRef = (c) => {
        const { overlayRect } = this.state

        if (!overlayRect) this.setState({ overlayRect: _.pick(c.getBoundingClientRect(), 'height', 'width') })
    }

    stickOverlay = () => this.setState({ overlayFixed: true })

    stickTopMenu = () => this.setState({ menuFixed: true })

    unStickOverlay = () => this.setState({ overlayFixed: false })

    unStickTopMenu = () => this.setState({ menuFixed: false })

    componentDidMount = () => {
        this.props.getAccentColor(this.props.AppAccentColor);
        console.clear();
        var seconds = 10000 * Math.random();
        //console.log(seconds);
        seconds = Math.floor(seconds) * new Date().getSeconds();
        seconds = seconds / 2;
        if (seconds % 17 === 1) { console.log(5); this.setState({ blogColor: 'red', resumeColor: 'black' }); }
        else if (seconds % 7 === 0) { console.log(7); this.setState({ blogColor: 'orange', resumeColor: 'blue' }); }
        else if (seconds % 8 === 0) { console.log(8); this.setState({ blogColor: 'olive', resumeColor: 'green' }); }
        else if (seconds % 9 === 0) { console.log(9); this.setState({ blogColor: 'teal', resumeColor: 'blue' }); }
        else if (seconds % 6 === 0) { console.log(6); this.setState({ blogColor: 'violet', resumeColor: 'purple' }); }
        else if (seconds % 4 === 0) { console.log(4); this.setState({ blogColor: 'green', resumeColor: 'red' }); }
        else if (seconds % 3 === 0) { console.log(3); this.setState({ blogColor: 'black', resumeColor: 'orange' }); }
        else if (seconds % 2 === 0) { console.log(2); this.setState({ blogColor: 'blue', resumeColor: 'orange' }); }
    }

    componentWillReceiveProps = () => {
        var seconds = 10000 * Math.random();
        seconds = Math.floor(seconds) * new Date().getMonth();
        seconds = seconds / 2;
        if (seconds % 17 === 1) { console.log(5); this.setState({ blogColor: 'red', resumeColor: 'black' }); }
        else if (seconds % 7 === 0) { console.log(7); this.setState({ blogColor: 'orange', resumeColor: 'blue' }); }
        else if (seconds % 8 === 0) { console.log(8); this.setState({ blogColor: 'olive', resumeColor: 'green' }); }
        else if (seconds % 9 === 0) { console.log(9); this.setState({ blogColor: 'teal', resumeColor: 'blue' }); }
        else if (seconds % 6 === 0) { console.log(6); this.setState({ blogColor: 'violet', resumeColor: 'purple' }); }
        else if (seconds % 4 === 0) { console.log(4); this.setState({ blogColor: 'green', resumeColor: 'red' }); }
        else if (seconds % 3 === 0) { console.log(3); this.setState({ blogColor: 'black', resumeColor: 'orange' }); }
        else if (seconds % 2 === 0) { console.log(2); this.setState({ blogColor: 'blue', resumeColor: 'orange' }); }
    }


    getRandomColor = () => {
        let color = 'blue';
        var seconds = 10000 * Math.random();
        seconds = Math.floor(seconds) * new Date().getMonth();
        if (seconds % 211 === 0) {
            color = 'orange';
        }
        else if (seconds % 7 === 0) {
            color = 'olive';
        }
        else if (seconds % 8 === 0) {
            color = 'teal';
        }
        else if (seconds % 9 === 0) {
            color = 'violet';
        }
        else if (seconds % 6 === 0) {
            color = 'green';
        }
        else if (seconds % 4 === 0) {
            color = 'yellow';
        }
        else if (seconds % 3 === 0) {
            color = 'purple';
        }
        else if (seconds % 2 === 0) {
            color = 'orange';
        }

        return color;
    }

    menuHandler = (e, data) => {
        switch (data.name) {
            case "Mushfiqur's Blog":
                this.setState({ activeItem: '' });
                this.props.emptyArticle();
                this.props.history.push('/');
                break;
            case 'index':
                this.setState({ activeItem: 'home' });
                this.props.emptyArticle();
                this.props.history.push('/');
                break;

            case 'tweets':
                this.setState({ activeItem: 'tweets' });
                this.props.history.push('/tweets');
                break;
            case 'articleadd':
                this.setState({ activeItem: 'articleadd' });
                this.props.history.push('/articleadd');
                break;
            case 'All Posts':
                this.setState({ activeItem: 'All Posts' });
                this.props.emptyArticle();
                this.props.history.push('/articles');
                break;
            case 'JsCheatSheet':
                this.setState({ activeItem: 'JsCheatSheet' });
                this.props.history.push('/JsCheatSheet');
                break;

            case 'TypoGraphic':
                this.setState({ activeItem: 'TypoGraphic' });
                this.props.history.push('/TypoGraphic');
                break;
            default:
                break;
        }
    }

    render() {

        const { menuFixed } = this.state

        var fixedMenuStyleUpdated = {
            ...fixedMenuStyle,
            borderBottom: '2px solid',
            borderBottomColor: this.props.AppAccentColor
        }

        var fixedMenuStyleUpdatedBottom = {
            ...fixedMenuStyle
        }

        var menuStyleUpdated = {
            ...menuStyle,
            borderBottom: '2px solid',
            borderBottomColor: this.props.AppAccentColor
        }

        var menuStyleUpdatedBottom = {
            ...menuStyleBottom
        }
        return (
            <div>
                {/*                
                    <div>
                        <Menu secondary fixed='top' style={fixedMenuStyleUpdated} >
                            <Menu.Item as='a' name="Mushfiqur's Blog" content="Mushfiqur's Blog" style={style.menuItem} onClick={this.menuHandler} className='focus-in-contract Alegreya' />
                            <Menu.Menu position='right'>
                                <Menu.Item as='a' className='focus-in-contract Alegreya' content='All Articles' name='All Posts' active={this.state.activeItem === 'all'} style={style.smallMenuItem} onClick={this.menuHandler} />
                            </Menu.Menu>
                        </Menu>
                    </div>
                */}

                <div style={{ marginTop: '60px' }}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/articles' component={ArticleViewer} />
                        <Route exact path='/articleadd' component={AddArticle} />
                        <Route exact path='/InstaFeed' component={InstaFeed} />
                        <Route exact path='/GithubTrends' component={GithubTrends} />
                        <Route exact path='/TransitionablePortalExampleControlled' component={TransitionablePortalExampleControlled} />
                        <Route exact path='/:articleUrl' component={ArticleDetails} />
                    </Switch>

                </div>
                {/*    TransitionablePortalExampleControlled            
                <div className='ui secondary bottom fixed menu' style={menuFixed ? fixedMenuStyleUpdatedBottom : menuStyleUpdatedBottom}>
                    <Message style={{ textAlign: 'center', width: '100%', borderRadius: '0' }}>

                        <Link to={SocialLinks.facebook} target='_blank' >
                            <Icon name='facebook square' title='View Facebook' color={this.props.AppAccentColor} size={socialIconSize} className='pulse' />
                        </Link>

                        <Link to={SocialLinks.twitter} target='_blank' >
                            <Icon name='twitter square' color={this.props.AppAccentColor} size={socialIconSize} className='pulse' title='View Tweets' />
                        </Link>

                        <Link to={SocialLinks.stackOverFlow} target='_blank' >
                            <Icon name='stack overflow' size={socialIconSize} color={this.props.AppAccentColor} className='pulse' title='View StackOverflow' />
                        </Link>

                        <Link to={SocialLinks.github} target='_blank' >
                            <Icon name='github square' size={socialIconSize} color={this.props.AppAccentColor} className='pulse' title='View Repositories' />
                        </Link>

                        <Link to={SocialLinks.instagram} target='_blank' >
                            <Icon name='instagram square' color={this.props.AppAccentColor} size={socialIconSize} className='pulse' title='View Instagram' />
                        </Link>

                        <Link to={SocialLinks.flickr} target='_blank' >
                            <Icon name='flickr square' size={socialIconSize} color={this.props.AppAccentColor} className='pulse' title='View Photos' />
                        </Link>

                        <Link to={SocialLinks.gplus} target='_blank' >
                            <Icon name='google plus square' size={socialIconSize} color={this.props.AppAccentColor} className='pulse' title='View Google' />
                        </Link>

                        <Link to={SocialLinks.lastfm} target='_blank' >
                            <Icon name='lastfm square' color={this.props.AppAccentColor} size={socialIconSize} className='pulse' title='View Scrobbles' />
                        </Link>
                        <Link to={SocialLinks.linkedIn} target='_blank' >
                            <Icon name='linkedin square' color={this.props.AppAccentColor} size={socialIconSize} className='pulse' title='View Pro Network' />
                        </Link>

                        <Link to={SocialLinks.pinterest} target='_blank' >
                            <Icon name='pinterest square' size={socialIconSize} color={this.props.AppAccentColor} className='pulse' title='View Pins' />
                        </Link>

                        <Link to={SocialLinks.tumblr} target='_blank' >
                            <Icon name='tumblr square' size={socialIconSize} color={this.props.AppAccentColor} className='pulse' title='View Tumblr' />
                        </Link>

                        <Link to={SocialLinks.mail} target='_top'>
                            <Icon name='mail' size={socialIconSize} color={this.props.AppAccentColor} className='pulse' title='Send Email' />
                        </Link>


                    </Message>
                </div>
                */}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        article: state.articleStore.article,
        AppAccentColor: state.articleStore.AppAccentColor
    }
}
export default connect(mapStateToProps, { emptyArticle, getAccentColor })(App);