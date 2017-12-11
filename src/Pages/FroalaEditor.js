import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Button, Segment,Input } from 'semantic-ui-react';
import {
    newPost, fetchPost, savePost, updatePost,
    titleOnChange,
    articleCategoryOnChange,
    articleBodyOnChange,
    articleSlugOnChange,
    articleUrlOnChange,
    metaUrlOnChange,
    metaTitleOnChange,
    metaImageOnChange,
    metaDescOnChange


} from '../Actions/postActions';
import ReactGA from 'react-ga';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

class FroalaEditorPage extends Component {

    state = {
        modelData: '',
        code: '',

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
        metaUrl: '',
        metaTitle: '',
        metaImage: '',
        metaDesc: '',
        metaKeys: ''
    }

    componentDidMount = () => {
        if (window.location.hostname !== 'localhost') {
            ReactGA.set({ page: window.location.href });
            ReactGA.pageview(window.location.href);
        }

        this.props.fetchPost(this.props.match.params._id);
    }

    handleModelChange = (modelParam) => {
        this.props.articleBodyOnChange(modelParam);
        this.setState({ modelData: modelParam, articleBody: modelParam });
    }

    handleSave = () => {
        console.log(this.state.modelData);
    }


    inputHandler = (e, data) => {
        var selfObj = this;
        switch (e.target.name) {
            case 'title':
                selfObj.props.titleOnChange(e.target.value);
                break;

            case 'metaTitle':
                selfObj.props.metaTitleOnChange(e.target.value);
                break;

            case 'metaDesc':
                selfObj.props.metaDescOnChange(e.target.value);
                break;

            case 'metaImage':
                selfObj.props.metaImageOnChange(e.target.value);
                break;

            case 'metaUrl':
                selfObj.props.metaUrlOnChange(e.target.value);
                break;
            case 'articleUrl':
                selfObj.props.articleUrlOnChange(e.target.value);
                break;
            case 'slug':
                selfObj.props.articleSlugOnChange(e.target.value);
                break;

            case 'code':
                selfObj.setState({ code: e.target.value });
                break;
            default:
                break;
        }
    }

    render() {

        const config = {
            placeholderText: 'Start writing something awesome!',
            charCounterCount: true,
            theme: 'dark',
            toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo'],
            pluginsEnabled: null
        }

        const { articleSlug, articleTitle, metaTitle, metaDesc, metaImage, metaUrl, articleUrl, articleCategory } = this.props.article;
        return (
            <div>
                <Segment>
                    <Input name='code' placeholder='Verification' size='mini' onBlur={this.inputHandler} />
                </Segment>
                <Segment>
                    {this.props.article.metaTitle}
                </Segment>
                <Segment style={{ display: 'grid' }}>
                    <Input name='slug' placeholder='Article Slug' size='huge' onChange={this.inputHandler} value={articleSlug} />
                    <Input name='title' placeholder='Article Title' size='huge' onChange={this.inputHandler} value={articleTitle} />
                    <Input name='metaTitle' placeholder='Meta Title' size='huge' onChange={this.inputHandler} value={metaTitle} />
                    <Input name='metaDesc' placeholder='Meta Description' size='huge' onChange={this.inputHandler} value={metaDesc} />
                    <Input name='metaImage' placeholder='Meta Image' size='huge' onChange={this.inputHandler} value={metaImage} />
                    <Input name='metaUrl' placeholder='Meta Url' size='huge' onChange={this.inputHandler} value={metaUrl} />
                    <Input name='articleUrl' placeholder='Article Url' size='huge' onChange={this.inputHandler} value={articleUrl} />
                    <Input name='articleSlug' placeholder='Slug' size='huge' onChange={this.inputHandler} value={articleSlug} />
                    <Input name='articleCategory' placeholder='Article Category' size='huge' onChange={this.inputHandler} value={articleCategory} />
                </Segment>
                <Button primary onClick={this.handleSave}>Save</Button>

                <Segment color={this.props.accent}>
                    <FroalaEditor tag='textarea' model={this.props.article.articleBody} config={config}
                        onModelChange={this.handleModelChange} />
                </Segment>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        article: state.postStore.post,
        loading: state.postStore.loading
    }
}
export default connect(mapStateToProps, {
    newPost, fetchPost, savePost, updatePost,
    titleOnChange,
    articleCategoryOnChange,
    articleBodyOnChange,
    articleSlugOnChange,
    articleUrlOnChange,
    metaUrlOnChange,
    metaTitleOnChange,
    metaImageOnChange,
    metaDescOnChange
})(FroalaEditorPage);

