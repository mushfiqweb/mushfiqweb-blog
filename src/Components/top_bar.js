import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Segment, Label, Menu } from 'semantic-ui-react';

export default class TopBar extends Component {
	render() {

		const activeItem = true;
		return (
			<div>
				<Segment>
					<NavLink exact to="/"> <Label color='green'>Home</Label> </NavLink>
					<NavLink to="/articles"><Label color='teal'>Articles</Label></NavLink>					
					<NavLink to="/idontexist"> <Label color='red'>Page 404</Label> </NavLink>
				</Segment>

				<Menu pointing secondary>
					<Menu.Item />
					<Menu.Item />
					<Menu.Item />
					<Menu.Item />
					<Menu.Item />
					<Menu.Item />
					<Menu.Item />
					<Menu.Item />
					<Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
					<Menu.Menu position='right'>
						<Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
					</Menu.Menu>
				</Menu>

			</div>
		)
	}
}