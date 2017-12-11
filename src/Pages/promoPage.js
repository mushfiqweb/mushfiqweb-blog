import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Segment, Header, Button, Divider, Loader, Dimmer, Input, Message, Label } from 'semantic-ui-react';
import { onEditorChange, saveArticle, newArticle, updateArticle } from '../Actions/article.Actions';
import ReactQuill from 'react-quill'; // ES6

// import stylesheet
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

const style = {

    h3: {
        marginTop: '1em',
        padding: '1em 0em',
    },
    editorHeight: {
        height: '45vh'
    }
}


const options = {
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
        ]
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'  // or 'bubble'
}



class PromoPage extends Component {

    state = {
        blogColor: 'brown',
        code: '',
        focused: '',
        resumeColor: 'olive'
    }

    componentDidMount = () => {
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
            setTimeout(() => this.props.saveArticle(this.props.editorText), 500);
            this.setState({ focused: '' });
        }
        else {
            this.setState({ focused: 't' });
        }

    }

    render() {
        return (
            <div>
                <Segment color={this.state.resumeColor} style={{ minHeight: '60vh' }}>
                    <Header
                        as='h5'
                        content='HTML Editor Example'
                        textAlign='center'
                    />
                    <div>
                        <Dimmer active={this.props.loading} inverted>
                            <Loader size='large'>
                                {this.props.loadingMessage}
                            </Loader>
                        </Dimmer>
                        <ReactQuill modules={options.modules} value={this.props.editorText}
                            placeholder='Start writing whatever you want...' style={style.editorHeight}
                            onChange={this.props.onEditorChange} />
                    </div>

                    <Divider />
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
                </Segment>

            </div>
        );

    }
}


export default PromoPage;

