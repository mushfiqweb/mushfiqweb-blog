import React, { Component } from "react";
import { Segment, Label } from 'semantic-ui-react'

export default class Projects extends Component {
	render() {
		return (
			<div>
				<Segment style={{ minHeight: '60vh', textAlign: 'center' }}>
					<div>
						<Label color='red' style={{ marginTop: '15px', fontSize: '40px', fontWeight: '600' }}>It's 404.</Label>
					</div>

					<div>
						<Label color='red' style={{ fontSize: '40px', fontWeight: '600' }}>We couldn't find the page.</Label>
					</div>
					<div>
						<Label color='red' style={{ fontSize: '40px', fontWeight: '600' }}>Sorry!</Label>
					</div>
				</Segment>
			</div>
		);
	}
}
