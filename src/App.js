import React, { Component } from 'react';
import classNames from 'classnames';
import Logo from './assets/svg/Logo';
import Github from './assets/svg/Github';
import './App.css';

const TEST = 'https://riangle.com/healthcheck-test.php';
const PROD = 'https://riangle.com/healthcheck-prod.php';
const CHTEST = 'https://riangle.com/healthcheck-ch-test.php';
const CHPROD = 'https://riangle.com/healthcheck-ch-prod.php';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			test: {},
			prod: {},
			chTest: {},
			chProd: {},
		}
	}

	loadData = () => {
		this.setState({
			test: {},
			prod: {},
			chTest: {},
			chProd: {},
		});
		this.fetchData();
	}

	fetchAPI = (API, env) => {
		fetch(API).then((response, env) => {
			return response.json();
		}).then((receivedResponse) => {
			console.log(receivedResponse, 'responseee');
			let freeMemory = receivedResponse.grape.data.memory.free.match(/^\d*/);
			let totalMemory = receivedResponse.grape.data.memory.total.match(/^\d*/);
			this.setState({
			[env]: {
					grapeStatus: receivedResponse.grape.status,
					mangoStatus: receivedResponse.mango.status,
					version: receivedResponse.grape.data.spectra,
					time: receivedResponse.grape.data.time,
					memory: {
						free: freeMemory,
						total: totalMemory,
					}
				}
			})
			console.log(this.state);
		}).catch((error) => {
			console.log(error);
			this.setState({
				[env]: {
					grapeStatus: 'down',
					mangoStatus: 'down',
					version: 'Unknown',
					time: 'Unknown',
					memory: {
						free: 'Unknown',
						total: 'Unknown',
					}
				}
			})
		})
	}

	fetchData = () => {
		setTimeout(() => {
			this.fetchAPI(TEST, 'test');
			this.fetchAPI(PROD, 'prod');
			this.fetchAPI(CHTEST, 'chTest');
			this.fetchAPI(CHPROD, 'chProd');
		}, 1500);
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		const { test, prod, chTest, chProd } = this.state;
		const hasData = prod['version'] && test['version'] && test['version'];
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
							<div className="ss-memory">
								Memory <span role="img" aria-label="mango">💾</span>
								<section>
									<div>
										<em>Free</em><strong>{test.memory.free} MB</strong>
									</div>
									<div>
										<em>Total</em><strong>{test.memory.total} MB</strong>
									</div>
								</section>
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
							<div className="ss-memory">
								Memory <span role="img" aria-label="mango">💾</span>
								<section>
									<div>
										<em>Free</em><strong>{prod.memory.free} MB</strong>
									</div>
									<div>
										<em>Total</em><strong>{prod.memory.total} MB</strong>
									</div>
								</section>
							</div>
							<div className="ss-time">
								{prod.time}
							</div>
						</section>
						<section>
							<div><h2>CH Test</h2></div>
							<div>
								<em>Spectra</em> <strong>{chTest.version}</strong>
								</div>
							<div>
								Grape <span role="img" aria-label="grape">🍇</span>
								<i className={chTest.grapeStatus}>{chTest.grapeStatus}</i>
								</div>
							<div>
								Mango <span role="img" aria-label="mango">🍊</span>
								<i className={chTest.mangoStatus}>{chTest.mangoStatus}</i>
							</div>
							<div className="ss-memory">
								Memory <span role="img" aria-label="mango">💾</span>
								<section>
									<div>
										<em>Free</em><strong>{chTest.memory.free} MB</strong>
									</div>
									<div>
										<em>Total</em><strong>{chTest.memory.total} MB</strong>
									</div>
								</section>
							</div>
							<div className="ss-time">
								{test.time}
							</div>
						</section>
						<section>
							<div><h2>CH Prod</h2></div>
							<div>
								<em>Spectra</em> <strong>{chProd.version}</strong>
								</div>
							<div>
								Grape <span role="img" aria-label="grape">🍇</span>
								<i className={chProd.grapeStatus}>{chProd.grapeStatus}</i>
								</div>
							<div>
								Mango <span role="img" aria-label="mango">🍊</span>
								<i className={chProd.grapeStatus}>{chProd.mangoStatus}</i>
							</div>
							<div className="ss-memory">
								Memory <span role="img" aria-label="mango">💾</span>
								<section>
									<div>
										<em>Free</em><strong>{chProd.memory.free} MB</strong>
									</div>
									<div>
										<em>Total</em><strong>{chProd.memory.total} MB</strong>
									</div>
								</section>
							</div>
							<div className="ss-time">
								{chProd.time}
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
