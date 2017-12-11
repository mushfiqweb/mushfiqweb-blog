import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Segment, Dimmer, Loader, Header, Label, Divider } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import { Animated } from "react-animated-css";
import { newMarkdown, fetchMarkdown } from '../Actions/article.Actions';

// import stylesheet
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

class JsCheatSheet extends Component {


    state = {
        anime: 'fadeIn',
        headerColor: 'green'
    }

    getRandomColor = () => {
        let color = 'blue';
        var seconds = 10000 * Math.random();
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

    componentDidMount = () => {
        if (window.location.hostname != 'localhost') {
            ReactGA.set({ page: window.location.href });
            ReactGA.pageview(window.location.href);
        }
        window.addEventListener('mouseup', this.pageClick, false);
        this.props.fetchMarkdown();
        this.setState({ anime: 'fadeOut', headerColor: this.getRandomColor() });

        (window.adsbygoogle = window.adsbygoogle || []).push({});
        let hash = this.props.location.hash.replace('#', '');
        if (hash) {
            let node = ReactDOM.findDOMNode(this.refs[hash]);
            if (node) {
                node.scrollIntoView();
            }
        }
    }

    componentWillMount = () => {
        
        this.props.newMarkdown();
    }

    pageClick = (evt) => {
        evt.preventDefault();

        if (evt.target.href) {
            let hash = this.props.location.hash;
            if (hash) {
                let node = ReactDOM.findDOMNode(this.refs[hash]);
                if (node) {
                    node.scrollIntoView();
                }
            }
            console.log(evt);
        }

    }

    render() {

        return (
            <div>
                <Segment color={this.state.headerColor} style={{ minHeight: '60vh' }}>
                    <Dimmer active={this.props.loading} inverted>
                        <Loader size='large'>
                            Getting there...
                        </Loader>
                    </Dimmer>
                    <Header as='h1' textAlign='center'>
                        <Animated animationIn={this.state.anime} animationOut="fadeOut" isVisible={true} animationInDelay={2}>
                            <Label color={this.state.headerColor}>
                                <h1>Modern Javascript Cheatsheet</h1>
                            </Label>
                        </Animated>
                    </Header>
                    <Divider color='grey' />
                    <div>
                        <div className='ad'>
                            <ins className='adsbygoogle'
                                style={{ display: 'block' }}
                                data-ad-client='ca-pub-1938723723817363'
                                data-ad-slot='5652783257'
                                data-ad-format='auto' />
                        </div>
                    </div>

                    <ReactMarkdown className='markdown-body' source={this.props.markdown} />
                </Segment>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        markdown: state.articleStore.markdown,
        loading: state.articleStore.loading
    }
}

export default connect(mapStateToProps, { newMarkdown, fetchMarkdown })(JsCheatSheet);

