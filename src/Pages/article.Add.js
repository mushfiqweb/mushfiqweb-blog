import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Segment, Header, Button, Divider, Loader, Dimmer, Input, Message, Label, TextArea } from 'semantic-ui-react';
import { onEditorChange, saveArticle, newArticle, updateArticle } from '../Actions/article.Actions';
import axios from 'axios';

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
        articleCategory: '',
        articleBody: ''
    }

    componentDidMount = () => {
    }

    checkSecurityCode = (e, data) => {
        this.setState({ code: e.target.value });
    }

    triggerAction = () => {
        if (this.state.code === '0020ASD') {
            this.props.newArticle();
            const ipClient = axios.get('https://freegeoip.net/json/').then((response) => {
                if (response) {
                    if (response.data) {                        
                        var article = {
                            articleBody: this.state.articleBody,
                            title: this.state.title,
                            metaTitle: this.state.metaTitle,
                            metaDesc: this.state.metaDesc,
                            metaImage: this.state.metaImage,
                            metaUrl: this.state.metaUrl,
                            articleUrl: this.state.articleUrl,
                            articleSlug: this.state.articleSlug,
                            articleCategory: this.state.articleCategory,
                            metaKeys: this.state.metaKeys,

                            city: response.data.city ? response.data.city : 'Dhaka',
                            country_code: response.data.country_code ? response.data.country_code : 'BD',
                            country_name: response.data.country_name ? response.data.country_name : 'Bangladesh',
                            ip: response.data.ip ? response.data.ip : '192.168.10.1',
                            latitude: response.data.latitude ? response.data.latitude : '0',
                            longitude: response.data.longitude ? response.data.longitude : '0',
                            zip_code: response.data.zip_code ? response.data.zip_code : '1212'

                        }
                        setTimeout(() => this.props.saveArticle(article), 500);
                        this.setState({ focused: '' });
                    }
                    else {
                        alert('No Data');
                    }
                } else {
                    alert('No Data');
                }
            }).catch((err) => {
                console.log(err)
            });

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
            //articleBody
            case 'articleBody':
                selfObj.setState({
                    articleBody: e.target.value
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

        const marginBottomStyle = {
            marginBottom: '15px'
        }

        const txtAreaStyleLarge = {
            minHeight: '600px',
            margin: 0,
            padding: '.78571429em 1em',
            background: '#fff',
            border: '1px solid #22242626',
            outline: '0',
            color: '#000000',
            borderRadius: '.28571429rem',
            boxShadow: '0 0 0 0 transparent inset',
            transition: 'color .1s ease, border - color .1s ease',
            fontSize: '1em',
            lineHeight: '1.2857',
            resize: 'vertical'
        }

        const txtAreaStyleSmall = {
            minHeight: '100px',
            margin: 0,
            padding: '.78571429em 1em',
            background: '#fff',
            border: '1px solid #22242626',
            outline: '0',
            color: '#000000',
            borderRadius: '.28571429rem',
            boxShadow: '0 0 0 0 transparent inset',
            transition: 'color .1s ease, border - color .1s ease',
            fontSize: '1em',
            lineHeight: '1.2857',
            resize: 'vertical'
        }

        const accentColor = 'ui segment ' + this.props.accent;

        return (
            <div>
                <Segment color={this.props.accent} style={{ display: 'flex', flexDirection: 'column' }}>
                    <Dimmer active={this.props.loading} inverted>
                        <Loader size='large'>
                            {this.props.loadingMessage}
                        </Loader>
                    </Dimmer>
                    <TextArea className={accentColor} name='articleBody' placeholder='Article Body' style={txtAreaStyleLarge} onChange={this.inputHandler} />
                    <Divider />
                    <Input style={marginBottomStyle} name='title' placeholder='Article Title' onBlur={this.inputHandler} />
                    <Input style={marginBottomStyle} name='metaTitle' placeholder='Meta Title' onBlur={this.inputHandler} />
                    <TextArea className={accentColor} name='metaDesc' placeholder='Meta Description' style={txtAreaStyleSmall} onChange={this.inputHandler} />
                    <Divider />
                    <Input style={marginBottomStyle} name='metaImage' placeholder='Meta Image' onBlur={this.inputHandler} />
                    <Input style={marginBottomStyle} name='metaUrl' placeholder='Meta Url' onBlur={this.inputHandler} />
                    <Input style={marginBottomStyle} name='articleUrl' placeholder='Article Url' onBlur={this.inputHandler} />
                    <TextArea className={accentColor} name='articleSlug' placeholder='Article Slug' style={txtAreaStyleSmall} onChange={this.inputHandler} />
                    <Divider />
                    <Input style={marginBottomStyle} name='articleCategory' placeholder='Article Category' onBlur={this.inputHandler} />
                    <Input style={marginBottomStyle} name='metaKeys' placeholder='Meta Keys' onBlur={this.inputHandler} />
                </Segment>

                <div style={{ marginTop: '40px', marginBottom: '30px' }}>
                    <Input error={this.state.code === '0020ASD' ? false : true} placeholder='security code' onBlur={this.checkSecurityCode} />
                    <Button content='Post Article' icon='save' labelPosition='left' floated='right' loading={this.props.loading} onClick={this.triggerAction} />
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
        article: state.articleStore.article,
        accent: state.articleStore.AppAccentColor
    }
}


export default connect(mapStateToProps, { onEditorChange, saveArticle, newArticle, updateArticle })(AddArticle);

