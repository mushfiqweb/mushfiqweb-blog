import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Label, Divider, Icon, Input, Dimmer, Loader, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import { getAccentColor, fetchFakeArticles } from '../Actions/article.Actions';
import Helmet from 'react-helmet';

class SubscribeMe extends Component {

    state = {
        loading: false,
        done: false
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

    EmailInputHandler = () => {

    }

    DoSubs = () => {
        var self = this;
        self.setState({ loading: true });
        setTimeout(() => {
            self.setState({ loading: false, done: true });
        }, 3000);
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
                <h3 style={window.innerWidth > 850 ? headerStyle.h3Large : headerStyle.h3Small}>This is my blog and I write at most <span style={{ backgroundColor: '#313030', padding: '0px 5px 3px 5px', color: '#fff' }}>THREE</span> articles every weeks.</h3>
                <Divider />
                <h3 style={window.innerWidth > 850 ? headerStyle.h3Large : headerStyle.h3Small}>Please subscribe to get updated posts <Icon size='large' name='thumbs up' /> </h3>

                <div className='ui segment'>
                    <Dimmer active={this.state.loading} inverted>
                        <Loader size='large'>
                            Subscribing...
                        </Loader>
                    </Dimmer>

                    <div style={{ display: this.state.done ? 'none' : 'block' }} >
                        <div>
                            <Input placeholder='Your Email' onBlur={this.EmailInputHandler} style={{ width: '300px' }} />
                        </div>
                        <div style={{ margin: '20px 0px 0px 0px' }}>
                            <Button color='green' onClick={this.DoSubs}>Subscribe Me</Button>
                        </div>
                    </div>

                    <div style={{ display: this.state.done ? 'block' : 'none' }} >
                        <h3 style={{ fontSize: '1.8' }}>Subscribed <Icon color='green' size='large' name='check' /> </h3>
                    </div>
                </div>
                <Divider />
                <Link to='/articles'>
                    <Label className='pulse Alegreya' color={this.props.accent}>
                        See my articles
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
export default connect(mapStateToProps, { getAccentColor, fetchFakeArticles })(SubscribeMe);

