import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";

import { Message, Divider, Visibility, Menu, Container, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import { emptyArticle } from './Actions/article.Actions';
import { connect } from 'react-redux';

import Home from "./Pages/landingPage";
import Missed from "./Components/missed";
import ArticleDetails from "./Pages/ArticleDetails";
import ArticleViewer from './Pages/ArticleViewer';
import AddArticle from './Pages/article.Add';
import FroalaEditor from "./Pages/FroalaEditor";
import ArticleListEdit from './Pages/ArticleListEdit';
import { SocialLinks } from './Utils/constants';

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

    handleOverlayRef = (c) => {
        const { overlayRect } = this.state

        if (!overlayRect) this.setState({ overlayRect: _.pick(c.getBoundingClientRect(), 'height', 'width') })
    }

    stickOverlay = () => this.setState({ overlayFixed: true })

    stickTopMenu = () => this.setState({ menuFixed: true })

    unStickOverlay = () => this.setState({ overlayFixed: false })

    unStickTopMenu = () => this.setState({ menuFixed: false })

    componentDidMount = () => {
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
        var seconds = 1500 * Math.random();
        seconds = Math.floor(seconds) * new Date().getMonth();
        if (seconds % 11 === 0) {
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
            borderBottomColor: this.state.resumeColor
        }

        var fixedMenuStyleUpdatedBottom = {
            ...fixedMenuStyle
        }

        var menuStyleUpdated = {
            ...menuStyle,
            borderBottom: '2px solid',
            borderBottomColor: this.state.resumeColor
        }

        var menuStyleUpdatedBottom = {
            ...menuStyleBottom
        }
        return (
            <Scrollbars autoHide style={{ height: '100vh' }}>

                {/*                
                <div>
                    <Visibility style={{ display: this.props.history.location.pathname === '/edit' ? 'none' : 'block', marginBottom: '15px' }}
                        onBottomPassed={this.stickTopMenu} onBottomVisible={this.unStickTopMenu} once={false}
                    >
                        <Menu secondary fixed={menuFixed && 'top'} style={menuFixed ? fixedMenuStyleUpdated : menuStyleUpdated}>
                            <Container>
                                <Menu.Item as='a' name="Mushfiqur's Blog" content="Mushfiqur's Blog" style={style.menuItem} onClick={this.menuHandler} className='pulse' />
                                <Menu.Menu position='right'>
                                    <Menu.Item as='a' className='pulse' content='All Articles' name='All Posts' active={this.state.activeItem === 'all'} style={style.smallMenuItem} onClick={this.menuHandler} />
                                </Menu.Menu>
                            </Container>
                        </Menu>
                    </Visibility>
                    <Divider />
                </div>
                */}


                <div>
                    <Menu secondary fixed='top' style={fixedMenuStyleUpdated} >
                        <Container>
                            <Menu.Item as='a' name="Mushfiqur's Blog" content="Mushfiqur's Blog" style={style.menuItem} onClick={this.menuHandler} className='pulse' />
                            <Menu.Menu position='right'>
                                <Menu.Item as='a' className='pulse' content='All Articles' name='All Posts' active={this.state.activeItem === 'all'} style={style.smallMenuItem} onClick={this.menuHandler} />
                            </Menu.Menu>
                        </Container>
                    </Menu>
                </div>

                <div>

                    <AnimatedSwitch atEnter={{ opacity: 0 }}
                        atLeave={{ opacity: 0 }}
                        atActive={{ opacity: 1 }}
                        className="switch-wrapper"
                    >

                        <AnimatedRoute
                            atEnter={{ opacity: 0 }}
                            atLeave={{ opacity: 0 }}
                            atActive={{ opacity: 1 }}
                            
                            exact path="/" component={Home} accent={this.state.resumeColor} />
                        <AnimatedRoute
                            atEnter={{ opacity: 0 }}
                            atLeave={{ opacity: 0 }}
                            atActive={{ opacity: 1 }}
                            exact path='/articles' component={ArticleViewer} accent={this.state.resumeColor} />
                        <AnimatedRoute
                            atEnter={{ opacity: 0 }}
                            atLeave={{ opacity: 0 }}
                            atActive={{ opacity: 1 }}
                            exact path='/articleadd' component={AddArticle} accent={this.state.resumeColor} />
                        <AnimatedRoute
                            atEnter={{ opacity: 0 }}
                            atLeave={{ opacity: 0 }}
                            atActive={{ opacity: 1 }}
                            exact path='/:articleUrl' component={ArticleDetails} accent={this.state.resumeColor} />

                    </AnimatedSwitch>

                    {/*                    
                    <AnimatedSwitch
                        atEnter={{ opacity: 0 }}
                        atLeave={{ opacity: 0 }}
                        atActive={{ opacity: 1 }}
                        className="switch-wrapper">



                        <AnimatedRoute
                            atEnter={{ offset: -100 }}
                            atLeave={{ offset: -100 }}
                            atActive={{ offset: 0 }}
                            exact path="/" component={Home} accent={this.state.resumeColor} />
                        <AnimatedRoute
                            atEnter={{ offset: -100 }}
                            atLeave={{ offset: -100 }}
                            atActive={{ offset: 0 }} exact path='/articles' component={ArticleViewer} accent={this.state.resumeColor} />
                        <AnimatedRoute
                            atEnter={{ offset: -100 }}
                            atLeave={{ offset: -100 }}
                            atActive={{ offset: 0 }} exact path='/articleadd' component={AddArticle} accent={this.state.resumeColor} />
                        <AnimatedRoute
                            atEnter={{ offset: -100 }}
                            atLeave={{ offset: -100 }}
                            atActive={{ offset: 0 }} exact path='/:articleUrl' component={ArticleDetails} accent={this.state.resumeColor} />

                    </AnimatedSwitch>
                    */}


                    {/*                        
                    <Route
                        render={({ location }) => (
                            <TransitionGroup component="main">
                                <AnimatedSwitch key={location.key} location={location}>
                                    <Route exact path="/" render={props => (<Home {...props} accent={this.state.resumeColor} />)} />
                                    <Route exact path='/writer' render={props => (<AddArticle {...props} />)} />
                                    <Route exact path='/articles' render={props => (<ArticleViewer {...props} accent={this.state.resumeColor} />)} />
                                    <Route exact path='/resp' render={props => (<ResponsiveLayout {...props} accent={this.state.resumeColor} />)} />
                                    <Route exact path='/edit' render={props => (<FroalaEditor {...props} accent={this.state.resumeColor} />)} />
                                    <Route exact path='/articleadd' render={props => (<AddArticle {...props} accent={this.state.resumeColor} />)} />
                                    <Route exact path='/pliste' render={props => (<ArticleListEdit {...props} accent={this.state.resumeColor} />)} />
                                    <Route exact path='/pliste/:_id' render={props => (<FroalaEditor {...props} accent={this.state.resumeColor} />)} />
                                    <Route exact path='/OnScrollLoad' render={props => (<OnScrollLoad {...props} accent={this.state.resumeColor} />)} />                                    
                                    <Route exact path='/draftjs' component={MyEditor}/>
                                    <Route exact path='/:articleUrl' render={props => (<ArticleDetails {...props} accent={this.state.resumeColor} />)} />
                                    <Route component={Missed} />
                                </AnimatedSwitch>
                            </TransitionGroup>
                        )}
                    />
                    */}
                </div>
                <div className='ui secondary bottom fixed menu' style={menuFixed ? fixedMenuStyleUpdatedBottom : menuStyleUpdatedBottom}>
                    <Message style={{ textAlign: 'center', width: '100%', borderRadius: '0' }}>

                        <Link to={SocialLinks.facebook} target='_blank' >
                            <Icon name='facebook' title='View Facebook' color={this.state.resumeColor} size={socialIconSize} className='pulse' />
                        </Link>

                        <Link to={SocialLinks.twitter} target='_blank' >
                            <Icon name='twitter' color={this.state.resumeColor} size={socialIconSize} className='pulse' title='View Tweets' />
                        </Link>

                        <Link to={SocialLinks.stackOverFlow} target='_blank' >
                            <Icon name='stack overflow' size={socialIconSize} color={this.state.resumeColor} className='pulse' title='View StackOverflow' />
                        </Link>

                        <Link to={SocialLinks.github} target='_blank' >
                            <Icon name='github' size={socialIconSize} color={this.state.resumeColor} className='pulse' title='View Repositories' />
                        </Link>

                        <Link to={SocialLinks.instagram} target='_blank' >
                            <Icon name='instagram' color={this.state.resumeColor} size={socialIconSize} className='pulse' title='View Instagram' />
                        </Link>

                        <Link to={SocialLinks.flickr} target='_blank' >
                            <Icon name='flickr' size={socialIconSize} color={this.state.resumeColor} className='pulse' title='View Photos' />
                        </Link>

                        <Link to={SocialLinks.gplus} target='_blank' >
                            <Icon name='google plus' size={socialIconSize} color={this.state.resumeColor} className='pulse' title='View Google' />
                        </Link>

                        <Link to={SocialLinks.lastfm} target='_blank' >
                            <Icon name='lastfm' color={this.state.resumeColor} size={socialIconSize} className='pulse' title='View Scrobbles' />
                        </Link>
                        <Link to={SocialLinks.linkedIn} target='_blank' >
                            <Icon name='linkedin' color={this.state.resumeColor} size={socialIconSize} className='pulse' title='View Pro Network' />
                        </Link>

                        <Link to={SocialLinks.pinterest} target='_blank' >
                            <Icon name='pinterest' size={socialIconSize} color={this.state.resumeColor} className='pulse' title='View Pins' />
                        </Link>

                        <Link to={SocialLinks.tumblr} target='_blank' >
                            <Icon name='tumblr' size={socialIconSize} color={this.state.resumeColor} className='pulse' title='View Tumblr' />
                        </Link>

                        <Link to={SocialLinks.mail} target='_top'>
                            <Icon name='mail' size={socialIconSize} color={this.state.resumeColor} className='pulse' title='Send Email' />
                        </Link>


                    </Message>
                </div>
            </Scrollbars >
        );
    }
}

function mapStateToProps(state) {
    return {
        article: state.articleStore.article
    }
}
export default connect(mapStateToProps, { emptyArticle })(App);