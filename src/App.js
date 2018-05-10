import React, { Component } from 'react';
import classNames from 'classnames';
import Logo from './assets/svg/Logo';
import Github from './assets/svg/Github';
import './App.css';

const APITEST = 'https://riangle.com/healthcheck-test.php';
const APIPROD = 'https://riangle.com/healthcheck-prod.php';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			test: {},
			prod: {},
		}
	}

	loadData = () => {
		this.setState({
			test: {},
			prod: {},
		});
		this.fetchData();
	}

	fetchTest = () => {
		fetch(APITEST).then((response) => {
			return response.json();
		})
		.then((responseTest) => {
			this.setState({
				test: {
					grapeStatus: responseTest.grape.status,
					mangoStatus: responseTest.mango.status,
					version: responseTest.grape.data.spectra,
					time: responseTest.grape.data.time,
				}
			})
		})
		.catch((error) => {
			console.log(error);
			this.setState({
				test: {
					grapeStatus: 'down',
					mangoStatus: 'down',
					version: 'Unknown',
					time: 'Unknown',
				}
			});
		})
	}

	fetchProd = () => {
		fetch(APIPROD).then((response) => {
			return response.json();
		})
		.then((responseProd) => {
			this.setState({
				prod: {
					grapeStatus: responseProd.grape.status,
					mangoStatus: responseProd.mango.status,
					version: responseProd.grape.data.spectra,
					time: responseProd.grape.data.time,
				}
			});
		})
		.catch((error) => {
			console.log(error);
			this.setState({
				prod: {
					grapeStatus: 'down',
					mangoStatus: 'down',
					version: 'Unknown',
					time: 'Unknown',
				}
			})
		})
	}

	fetchData = () => {
		setTimeout(() => {
			this.fetchProd();
			this.fetchTest();
		}, 1500);
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		const { prod, test } = this.state;
		const hasData = prod['version'] && test['version'];
		return (
			<div className={classNames('ss-wrapper', {
				'loaded': hasData
			})}>
				<main className="ss-container">
					<header className={classNames('ss-header', {
							'loaded': hasData
						})}>
						<div className="ss-logo" onClick={this.loadData}>
							<Logo shape1 />
							<Logo shape2 />
							<Logo name />
						</div>
					</header>
					{hasData && <div className="ss-content">
						<section>
							<div><h2>Test</h2></div>
							<div>
								<em>Spectra</em> <strong>{test.version}</strong>
								</div>
							<div>
								Grape <span role="img" aria-label="grape">🍇</span>
								<i className={test.grapeStatus}>{test.grapeStatus}</i>
								</div>
							<div>
								Mango <span role="img" aria-label="mango">🍊</span>
								<i className={test.mangoStatus}>{test.mangoStatus}</i>
							</div>
							<div className="ss-time">
								{test.time}
							</div>
						</section>
						<section>
							<div><h2>Prod</h2></div>
							<div>
								<em>Spectra</em> <strong>{prod.version}</strong>
								</div>
							<div>
								Grape <span role="img" aria-label="grape">🍇</span>
								<i className={prod.grapeStatus}>{prod.grapeStatus}</i>
								</div>
							<div>
								Mango <span role="img" aria-label="mango">🍊</span>
								<i className={prod.grapeStatus}>{prod.mangoStatus}</i>
							</div>
							<div className="ss-time">
								{prod.time}
							</div>
						</section>
					</div>}
					<div className="ss-github">
						<a href="https://github.com/luangjokaj/spectra-status" 
							target="_blank"
							rel="noopener noreferrer"
						>
							<Github />
						</a>
					</div>
				</main>
			</div>
		);
	}
}

export default App;
