import React, { Component } from 'react';
import classNames from 'classnames';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isVisible: false
		}

		setTimeout(() => {
			this.setState({ isVisible: true });
		}, 1000)
	}
	render() {
		const { isVisible } = this.state;
		return (
			<div className={classNames('App', {
				'visible': isVisible
			})}>
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
			</div>
		);
	}
}

export default App;
