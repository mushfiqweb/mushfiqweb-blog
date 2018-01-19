import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import { getAccentColor, fetchFakeArticles } from '../Actions/article.Actions';
import Helmet from 'react-helmet';
class HomeLayout extends Component {

    state = {
    }

    componentDidMount = () => {
        this.props.getAccentColor(this.props.accent);
        this.props.fetchFakeArticles();
        if (window.location.hostname !== 'localhost') {
            ReactGA.set({ page: window.location.href });
            ReactGA.pageview(window.location.href);
        }
    }

    GotoPosts = () => {
        this.props.history.push('/articles');
    }

    render() {

        const headerStyle = {
            h1Small: {
                marginRight: '115px', fontSize: '1rem'
            },
            h1Large: {
                marginRight: '115px', fontSize: '2rem'
            },
            h2Small: {
                fontSize: '0.9rem'
            },
            h2Large: {
                fontSize: '1.7rem'
            },
            h3Small: {
                fontSize: '0.8rem'
            },
            h3Large: {
                fontSize: '1.5rem'
            }
        }


        return (
            <div className='fade-in-top' style={{ height: window.innerHeight - 520, textAlign: 'center' }}>

                <h1 style={window.innerWidth > 850 ? headerStyle.h1Large : headerStyle.h1Small} className="sentence">Hi, I'm Mushfiqur Rahman. I am a
                    <div className="fadeIn">
                        <span>software developer.</span>
                        <span>photographer.</span>
                        <span>freelancer.</span>
                        <span>tech geek.</span>
                        <span>music enthusiast.</span>
                    </div>
                </h1>

                <h2 style={window.innerWidth > 850 ? headerStyle.h2Large : headerStyle.h2Small}>I write code in javascript.</h2>
                <h3 style={window.innerWidth > 850 ? headerStyle.h3Large : headerStyle.h3Small}>Read My Articles.</h3>
                <Link to='/articles'>
                    <Label className='pulse Alegreya' color={this.props.accent}>
                        See my articles
                    </Label>
                </Link>
                <div>
                    &nbsp;
                </div>
                <h4 style={window.innerWidth > 850 ? headerStyle.h3Large : headerStyle.h3Small}>Check out the following app created using <Link target="_blank" to='https://github.com/facebookincubator/create-react-app' className="cool-link Alegreya">Create React App</Link>, <Link target="_blank" to='https://redux.js.org/' className="cool-link Alegreya">Redux</Link>, and <Link target="_blank" to='https://firebase.google.com/' className="cool-link Alegreya">Firebase</Link>.</h4>


                <Link target="_blank" to='https://mushfiqweb-todo.firebaseapp.com/'>
                    <Label className='pulse Alegreya' color={this.props.accent}>
                        A Simple Todo App
                    </Label>
                </Link>

            </div >

        );
    }
}
function mapStateToProps(state) {
    return {
        editorText: state.articleStore.editorText,
        accent: state.articleStore.AppAccentColor
    }
}
export default connect(mapStateToProps, { getAccentColor, fetchFakeArticles })(HomeLayout);

