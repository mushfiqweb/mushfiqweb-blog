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
import SocialMenu from './Components/SocialMenu';
import TransitionablePortalExampleControlled from './Pages/Transition.Portal';
import { AnimatedSwitch, AnimatedRoute } from 'react-router-transition';


class App extends Component {

    componentDidMount = () => {
        this.props.getAccentColor(this.props.AppAccentColor);
        console.clear();
    }


    menuHandler = (e, data) => {
        switch (e.target.title) {
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
            case 'All Articles':
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
        const newMenu = {
            menuFixedNew: {
                borderBottom: '2px solid',
                borderBottomColor: this.props.AppAccentColor,
                boxShadow: '0px 3px 5px rgba(8, 7, 7, 0.2)'
            }
        }

        return (
            <div>
                <div className="ui fixed fluid menu" style={newMenu.menuFixedNew}>
                    <div className="ui container">
                        <div title="Mushfiqur's Blog" className="item borderless menu-home pulse" onClick={this.menuHandler}>Mushfiqur's Blog</div>

                        <div title='All Articles' className="item borderless right menu-home-small pulse" onClick={this.menuHandler}>All Articles</div>
                    </div>
                </div>

                <div style={{ marginTop: '65px' }}>
                    <div className="ui container">
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
                </div>
                <SocialMenu accent={this.props.AppAccentColor} />
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

