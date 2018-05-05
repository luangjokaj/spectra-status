import React, { Component } from 'react';
import classNames from 'classnames';
import Logo from './assets/svg/Logo';
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
			<div className={classNames('ss-wrapper', {
				'loaded': isVisible
			})}>
				<main className="ss-container">
					<header className="ss-header">
						<Logo />
					</header>
					{isVisible && <div className="ss-content">
						<span>Grape Status:</span> {spectra.grapeStatus}
						<span>Mango Status:</span> {spectra.mangoStatus}
						<span>Version:</span> {spectra.version}
					</div>}
				</main>
			</div>
		);
	}
}

export default App;
