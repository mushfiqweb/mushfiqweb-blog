import React, { Component } from "react";
import { Segment, Label, Message, Header } from 'semantic-ui-react';

import TaskInput from './TaskInput';
import TaskList from './TaskList';


export default class Home extends Component {
	render() {
		return (
			<div>
				<Segment>
					<div className="App">
						<TaskInput />
						<TaskList />
					</div>
				</Segment>
			</div>
		);
	}
}
