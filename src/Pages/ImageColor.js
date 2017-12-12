import React from 'react';
import { Label, Segment } from "semantic-ui-react";
// if using webpack
// import 'medium-draft/lib/index.css';

export default class ImageColor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {

        return (
            <div>
                <Segment>
                    <input className='color-input' type="color" value="#0000ff"/>
                    <img src="http://www.hyderabadinteriordesigners.in/wp-content/uploads/2016/08/Sleek-interior-design-wallpapers-models-pattern.jpg" />
                </Segment>
            </div>
        );
    }
};