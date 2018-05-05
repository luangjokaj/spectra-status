import React, { Component } from 'react';
import classNames from 'classnames';
import Logo from './assets/svg/Logo';
import './App.css';

const APITEST = fetch('https://riangle.com/healthcheck-test').then((response) => {
	return response.json();
});

const APIPROD = fetch('https://riangle.com/healthcheck-prod').then((response) => {
	return response.json();
});

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isVisible: false,
			spectra: {}
		}
	}

	loadData = () => {
		this.setState({ isVisible: false });
		this.fetchData();
	}

	fetchData = () => {
		Promise.all([
			APITEST,
			APIPROD
		])
		.then(([responseTest, responseProd]) => {
			console.log(responseTest);
			setTimeout(() => {
				this.setState({
					spectra: {
						test: {
							grapeStatus: responseTest.grape.status,
							mangoStatus: responseTest.mango.status,
							version: responseTest.grape.data.spectra,
							time: responseTest.grape.data.time,
						},
						prod: {
							grapeStatus: responseProd.grape.status,
							mangoStatus: responseProd.mango.status,
							version: responseProd.grape.data.spectra,
							time: responseProd.grape.data.time,
						}
					},
					isVisible: true
				})
			}, 1000)
		})
	}

	componentDidMount() {
		this.fetchData();
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
						<div className="ss-logo" onClick={this.loadData}>
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
							<div className="ss-time">
								{spectra.test.time}
							</div>
						</section>
						<section>
							<div><h2>Prod</h2></div>
							<div>
								Spectra <strong>{spectra.prod.version}</strong>
								</div>
							<div>
								Grape <span role="img" aria-label="grape">🍇</span>
								<i className={spectra.prod.grapeStatus}>{spectra.prod.grapeStatus}</i>
								</div>
							<div>
								Mango <span role="img" aria-label="mango">🍊</span>
								<i className={spectra.prod.grapeStatus}>{spectra.prod.mangoStatus}</i>
							</div>
							<div className="ss-time">
								{spectra.prod.time}
							</div>
						</section>
					</div>}
				</main>
			</div>
		);
	}
}

export default App;
