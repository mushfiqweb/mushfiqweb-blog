import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Segment, Header, Button, Divider, Loader, Dimmer, Input, Message, Label } from 'semantic-ui-react';
import { onEditorChange, saveArticle, newArticle, updateArticle } from '../Actions/article.Actions';
import ReactGA from 'react-ga';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';


class AddArticle extends Component {

    state = {
        blogColor: 'brown',
        code: '',
        focused: '',
        resumeColor: 'olive',
        title: '',
        metaTitle: '',
        metaDesc: '',
        metaImage: '',
        articleSlug: '',
        metaUrl: '',
        metaKeys: '',
        articleCategory: ''
    }

    componentDidMount = () => {
        if (window.location.hostname !== 'localhost') {
            ReactGA.set({ page: window.location.href });
            ReactGA.pageview(window.location.href);
        }
        var seconds = 10000 * Math.random();
        seconds = Math.floor(seconds) * new Date().getMonth();
        if (seconds % 11 === 0) { console.log(5); this.setState({ blogColor: 'red', resumeColor: 'black' }); }
        else if (seconds % 7 === 0) { console.log(7); this.setState({ blogColor: 'orange', resumeColor: 'yellow' }); }
        else if (seconds % 8 === 0) { console.log(8); this.setState({ blogColor: 'olive', resumeColor: 'green' }); }
        else if (seconds % 9 === 0) { console.log(9); this.setState({ blogColor: 'teal', resumeColor: 'blue' }); }
        else if (seconds % 6 === 0) { console.log(6); this.setState({ blogColor: 'violet', resumeColor: 'purple' }); }
        else if (seconds % 4 === 0) { console.log(4); this.setState({ blogColor: 'green', resumeColor: 'red' }); }
        else if (seconds % 3 === 0) { console.log(3); this.setState({ blogColor: 'black', resumeColor: 'orange' }); }
        else if (seconds % 2 === 0) { console.log(2); this.setState({ blogColor: 'blue', resumeColor: 'orange' }); }



    }

    checkSecurityCode = (e, data) => {
        this.setState({ code: e.target.value });
    }

    triggerAction = () => {

        if (this.state.code === '0020ASD') {
            this.props.newArticle();
            var article = {
                articleBody: this.state.editorText,
                title: this.state.title,
                metaTitle: this.state.metaTitle,
                metaDesc: this.state.metaDesc,
                metaImage: this.state.metaImage,
                metaUrl: this.state.metaUrl,
                articleUrl: this.state.articleUrl,
                articleSlug: this.state.articleSlug,
                articleCategory: this.state.articleCategory,
                metaKeys: this.state.metaKeys
            }
            setTimeout(() => this.props.saveArticle(article), 500);
            this.setState({ focused: '' });
        }
        else {
            this.setState({ focused: 't' });
        }

    }

    inputHandler = (e, data) => {
        var selfObj = this;
        switch (e.target.name) {
            case 'title':
                selfObj.setState({
                    title: e.target.value
                });
                break;

            case 'metaTitle':
                selfObj.setState({
                    metaTitle: e.target.value
                });
                break;

            case 'metaDesc':
                selfObj.setState({
                    metaDesc: e.target.value
                });
                break;

            case 'metaImage':
                selfObj.setState({
                    metaImage: e.target.value
                });
                break;

            case 'metaUrl':
                selfObj.setState({
                    metaUrl: e.target.value
                });
                break;
            case 'articleUrl':
                selfObj.setState({
                    articleUrl: e.target.value
                });
                break;
            case 'articleSlug':
                selfObj.setState({
                    articleSlug: e.target.value
                });
                break;
            case 'articleCategory':
                selfObj.setState({
                    articleCategory: e.target.value
                });
                break;
            case 'metaKeys':
                selfObj.setState({
                    metaKeys: e.target.value
                });
                break;
            /*
            articleCategory
            metaTitle: '',
            metaDesc: '',
            metaImage: '',
            metaUrl: ''
            */
            default:
                break;
        }
    }

    onEditorChange = (modelParam) => {
        this.setState({ editorText: modelParam });
    }

    render() {


        const config = {
            placeholderText: 'Start writing something awesome!',
            charCounterCount: false
        }

        return (
            <div>


                <Segment color={this.props.accent} style={{ display: 'grid' }}>
                    <Input name='title' placeholder='Article Title' size='huge' onBlur={this.inputHandler} />
                    <Input name='metaTitle' placeholder='Meta Title' size='huge' onBlur={this.inputHandler} />
                    <Input name='metaDesc' placeholder='Meta Description' size='huge' onBlur={this.inputHandler} />
                    <Input name='metaImage' placeholder='Meta Image' size='huge' onBlur={this.inputHandler} />
                    <Input name='metaUrl' placeholder='Meta Url' size='huge' onBlur={this.inputHandler} />
                    <Input name='articleUrl' placeholder='Article Url' size='huge' onBlur={this.inputHandler} />
                    <Input name='articleSlug' placeholder='Slug' size='huge' onBlur={this.inputHandler} />
                    <Input name='articleCategory' placeholder='Article Category' size='huge' onBlur={this.inputHandler} />
                    <Input name='metaKeys' placeholder='Meta Keys' size='huge' onBlur={this.inputHandler} />
                </Segment>

                <div style={{ marginTop: '40px', marginBottom: '30px' }}>
                    <Input error={this.state.code === '0020ASD' ? false : true} placeholder='security code' onBlur={this.checkSecurityCode} />
                    <Button content='Post Article' icon='save' labelPosition='left' floated='right' loading={this.props.loading} onClick={this.triggerAction} />
                </div>
                <div style={{ display: this.state.focused === 't' ? 'block' : 'none' }} >
                    <Message>
                        <Header as='h3'>
                            <Label color={this.state.code === '0020ASD' ? 'green' : 'red'}>
                                Security Code
                                </Label>
                        </Header>
                    </Message>
                </div>

                <Divider />

                <div>
                    <Dimmer active={this.props.loading} inverted>
                        <Loader size='large'>
                            {this.props.loadingMessage}
                        </Loader>
                    </Dimmer>
                    <FroalaEditor tag='textarea' model={this.state.editorText} config={config}
                        onModelChange={this.onEditorChange} />
                </div>


            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        editorText: state.articleStore.editorText,
        loading: state.articleStore.loading,
        loadingMessage: state.articleStore.loadingMessage,
        article: state.articleStore.article
    }
}


export default connect(mapStateToProps, { onEditorChange, saveArticle, newArticle, updateArticle })(AddArticle);

