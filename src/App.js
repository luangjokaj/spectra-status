import React, { Component } from 'react';
import classNames from 'classnames';
import logo from './logo.svg';
import './App.css';

const API = 'https://riangle.com/healthcheck.json';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isVisible: false,
			spectra: {}
		}
	}

	componentDidMount() {
		fetch(API)
		.then(response => response.json())
		.then(data => this.setState({
			spectra: {
				grapeStatus: data.grape.status,
				mangoStatus: data.mango.status,
				version: data.grape.data.spectra,
				time: data.grape.data.time,
			}, 
			isVisible: true
		}))
	}

	render() {
		const { isVisible, spectra } = this.state;
		return (
			<div className={classNames('App', {
				'visible': isVisible
			})}>
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				{isVisible && <div>
					<span>Grape Status:</span> {spectra.grapeStatus}
					<span>Mango Status:</span> {spectra.mangoStatus}
					<span>Version:</span> {spectra.version}
				</div>}
				{isVisible ?<div>isVisible Ture</div>:<div>isVisible False</div>}
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
			</div>
		);
	}
}

export default App;
