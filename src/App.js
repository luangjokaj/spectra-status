import React, { Component } from 'react';
import classNames from 'classnames';
import Logo from './assets/svg/Logo';
import './App.css';

const APITEST = 'https://riangle.com/healthcheck-test.json';
const APIPROD = 'https://riangle.com/healthcheck-prod.json';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isVisible: false,
			spectra: {}
		}
	}

	componentDidMount() {
		setTimeout(() => {
			fetch(APITEST)
			.then(response => response.json())
			.then(data => this.setState({
				spectra: {
					test: {
						grapeStatus: data.grape.status,
						mangoStatus: data.mango.status,
						version: data.grape.data.spectra,
						time: data.grape.data.time,
					}
				}, 
				isVisible: true
			}))
		}, 3000)
	}

	render() {
		const { isVisible, spectra } = this.state;
		return (
			<div className={classNames('ss-wrapper', {
				'loaded': isVisible
			})}>
				<main className="ss-container">
					<header className={classNames('ss-header', {
							'loaded': isVisible
						})}>
						<div className="ss-logo">
							<Logo shape1 />
							<Logo shape2 />
							<Logo name />
						</div>
					</header>
					{isVisible && <div className="ss-content">
						<section>
							<div><h2>Test</h2></div>
							<div>
								Spectra <strong>{spectra.test.version}</strong>
								</div>
							<div>
								Grape <span role="img" aria-label="grape">🍇</span>
								<i className={spectra.test.grapeStatus}>{spectra.test.grapeStatus}</i>
								</div>
							<div>
								Mango <span role="img" aria-label="mango">🍊</span>
								<i className={spectra.test.mangoStatus}>{spectra.test.mangoStatus}</i>
								</div>
						</section>
						<section>
							<div><h2>Prod</h2></div>
							<div>
								Spectra <strong>{spectra.test.version}</strong>
								</div>
							<div>
								Grape <span role="img" aria-label="grape">🍇</span>
								<i className={spectra.test.grapeStatus}>{spectra.test.grapeStatus}</i>
								</div>
							<div>
								Mango <span role="img" aria-label="mango">🍊</span>
								<i className={spectra.test.grapeStatus}>{spectra.test.mangoStatus}</i>
								</div>
						</section>
						<section className="ss-time">
							<div>
								{spectra.test.time}
							</div>
						</section>
					</div>}
				</main>
			</div>
		);
	}
}

export default App;
