import React, { Component } from 'react';
import classNames from 'classnames';
import Logo from './assets/svg/Logo';
import Github from './assets/svg/Github';
import './App.css';

const TEST = 'https://riangle.com/healthcheck-test.php';
const PROD = 'https://riangle.com/healthcheck-prod.php';
const CH1TEST = 'https://riangle.com/healthcheck-ch1-test.php';
const CH1PROD = 'https://riangle.com/healthcheck-ch1-prod.php';
const DSTTEST = 'https://riangle.com/healthcheck-dst-test.php';
const DSTPROD = 'https://riangle.com/healthcheck-dst-prod.php';
const PRETEST = 'https://riangle.com/healthcheck-pre-test.php';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			test: {},
			prod: {},
			preTest: {},
			ch1Test: {},
			ch1Prod: {},
			dstTest: {},
			dstProd: {},
		};
	}

	loadData = () => {
		this.setState({
			test: {},
			prod: {},
			preTest: {},
			ch1Test: {},
			ch1Prod: {},
			dstTest: {},
			dstProd: {},
		});
		this.fetchData();
	};

	fetchAPI = (API, env) => {
		fetch(API)
			.then((response, env) => {
				return response.json();
			})
			.then(receivedResponse => {
				console.log(receivedResponse, 'Response');
				const freeMemory = receivedResponse.grape.data.memory.free.match(/^\d*/);
				const totalMemory = receivedResponse.grape.data.memory.total.match(/^\d*/);
				const difference = Number(totalMemory[0]) - Number(freeMemory[0]);
				const average = (Number(totalMemory[0]) + Number(freeMemory[0])) / 2;
				const percentage = difference / average * 100;

				this.setState({
					[env]: {
						grapeStatus: receivedResponse.grape.status,
						mangoStatus: receivedResponse.mango.status,
						version: receivedResponse.grape.data.spectra,
						time: receivedResponse.grape.data.time,
						memory: {
							free: freeMemory,
							total: totalMemory,
							percentage: percentage,
						},
					},
				});
				console.log(this.state);
			})
			.catch(error => {
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
							percentage: 0,
						},
					},
				});
			});
	};

	fetchData = () => {
		setTimeout(() => {
			this.fetchAPI(TEST, 'test');
			this.fetchAPI(PROD, 'prod');
			this.fetchAPI(PRETEST, 'preTest');
			this.fetchAPI(CH1TEST, 'ch1Test');
			this.fetchAPI(CH1PROD, 'ch1Prod');
			this.fetchAPI(DSTTEST, 'dstTest');
			this.fetchAPI(DSTTEST, 'dstProd');
		}, 1500);
	};

	componentDidMount() {
		this.fetchData();
	}

	render() {
		const { test, prod, preTest, ch1Test, ch1Prod, dstTest, dstProd } = this.state;
		const hasData =
			test['version'] &&
			prod['version'] &&
			preTest['version'] &&
			ch1Test['version'] &&
			ch1Prod['version'] &&
			dstTest['version'] &&
			dstProd['version'];

		return (
			<div
				className={classNames('ss-wrapper', {
					loaded: hasData,
				})}
			>
				<main className="ss-container">
					<header
						className={classNames('ss-header', {
							loaded: hasData,
						})}
					>
						<div className="ss-logo" onClick={this.loadData}>
							<Logo shape1 />
							<Logo shape2 />
							<Logo name />
						</div>
					</header>
					{hasData && (
						<div className="ss-content">
							<section>
								<div>
									<h2>Test</h2>
								</div>
								<div>
									<em>Spectra</em> <strong>{test.version}</strong>
								</div>
								<div>
									Grape{' '}
									<span role="img" aria-label="grape">
										🍇
									</span>
									<i className={test.grapeStatus}>{test.grapeStatus}</i>
								</div>
								<div>
									Mango{' '}
									<span role="img" aria-label="mango">
										🍊
									</span>
									<i className={test.mangoStatus}>{test.mangoStatus}</i>
								</div>
								<div className="ss-memory">
									Memory
									<section>
										<div>
											<em>Total</em>
											<strong>{test.memory.total} MB</strong>
										</div>
										<div>
											<em>Free</em>
											<strong>{test.memory.free} MB</strong>
										</div>
										<span
											className={classNames('ss-progress', {
												red: test.memory.percentage > 70,
												warning: test.memory.percentage > 40,
												error: test.memory.percentage === 0,
											})}
										>
											<i style={{ width: `${test.memory.percentage}%` }} />
										</span>
									</section>
								</div>
								<div className="ss-time">{test.time}</div>
							</section>
							<section>
								<div>
									<h2>Prod</h2>
								</div>
								<div>
									<em>Spectra</em> <strong>{prod.version}</strong>
								</div>
								<div>
									Grape{' '}
									<span role="img" aria-label="grape">
										🍇
									</span>
									<i className={prod.grapeStatus}>{prod.grapeStatus}</i>
								</div>
								<div>
									Mango{' '}
									<span role="img" aria-label="mango">
										🍊
									</span>
									<i className={prod.grapeStatus}>{prod.mangoStatus}</i>
								</div>
								<div className="ss-memory">
									Memory
									<section>
										<div>
											<em>Total</em>
											<strong>{prod.memory.total} MB</strong>
										</div>
										<div>
											<em>Free</em>
											<strong>{prod.memory.free} MB</strong>
										</div>
										<span
											className={classNames('ss-progress', {
												red: prod.memory.percentage > 70,
												warning: prod.memory.percentage > 40,
												error: prod.memory.percentage === 0,
											})}
										>
											<i style={{ width: `${prod.memory.percentage}%` }} />
										</span>
									</section>
								</div>
								<div className="ss-time">{prod.time}</div>
							</section>
							<section>
								<div>
									<h2>Pre Test</h2>
								</div>
								<div>
									<em>Spectra</em> <strong>{preTest.version}</strong>
								</div>
								<div>
									Grape{' '}
									<span role="img" aria-label="grape">
										🍇
									</span>
									<i className={preTest.grapeStatus}>{preTest.grapeStatus}</i>
								</div>
								<div>
									Mango{' '}
									<span role="img" aria-label="mango">
										🍊
									</span>
									<i className={preTest.grapeStatus}>{preTest.mangoStatus}</i>
								</div>
								<div className="ss-memory">
									Memory
									<section>
										<div>
											<em>Total</em>
											<strong>{preTest.memory.total} MB</strong>
										</div>
										<div>
											<em>Free</em>
											<strong>{preTest.memory.free} MB</strong>
										</div>
										<span
											className={classNames('ss-progress', {
												red: preTest.memory.percentage > 70,
												warning: preTest.memory.percentage > 40,
												error: preTest.memory.percentage === 0,
											})}
										>
											<i style={{ width: `${preTest.memory.percentage}%` }} />
										</span>
									</section>
								</div>
								<div className="ss-time">{preTest.time}</div>
							</section>
							<section>
								<div>
									<h2>CH1 Test</h2>
								</div>
								<div>
									<em>Spectra</em> <strong>{ch1Test.version}</strong>
								</div>
								<div>
									Grape{' '}
									<span role="img" aria-label="grape">
										🍇
									</span>
									<i className={ch1Test.grapeStatus}>{ch1Test.grapeStatus}</i>
								</div>
								<div>
									Mango{' '}
									<span role="img" aria-label="mango">
										🍊
									</span>
									<i className={ch1Test.mangoStatus}>{ch1Test.mangoStatus}</i>
								</div>
								<div className="ss-memory">
									Memory
									<section>
										<div>
											<em>Total</em>
											<strong>{ch1Test.memory.total} MB</strong>
										</div>
										<div>
											<em>Free</em>
											<strong>{ch1Test.memory.free} MB</strong>
										</div>
										<span
											className={classNames('ss-progress', {
												red: ch1Test.memory.percentage > 70,
												warning: ch1Test.memory.percentage > 40,
												error: ch1Test.memory.percentage === 0,
											})}
										>
											<i style={{ width: `${ch1Test.memory.percentage}%` }} />
										</span>
									</section>
								</div>
								<div className="ss-time">{test.time}</div>
							</section>
							<section>
								<div>
									<h2>CH1 Prod</h2>
								</div>
								<div>
									<em>Spectra</em> <strong>{ch1Prod.version}</strong>
								</div>
								<div>
									Grape{' '}
									<span role="img" aria-label="grape">
										🍇
									</span>
									<i className={ch1Prod.grapeStatus}>{ch1Prod.grapeStatus}</i>
								</div>
								<div>
									Mango{' '}
									<span role="img" aria-label="mango">
										🍊
									</span>
									<i className={ch1Prod.grapeStatus}>{ch1Prod.mangoStatus}</i>
								</div>
								<div className="ss-memory">
									Memory
									<section>
										<div>
											<em>Total</em>
											<strong>{ch1Prod.memory.total} MB</strong>
										</div>
										<div>
											<em>Free</em>
											<strong>{ch1Prod.memory.free} MB</strong>
										</div>
										<span
											className={classNames('ss-progress', {
												red: ch1Prod.memory.percentage > 70,
												warning: ch1Prod.memory.percentage > 40,
												error: ch1Prod.memory.percentage === 0,
											})}
										>
											<i style={{ width: `${ch1Prod.memory.percentage}%` }} />
										</span>
									</section>
								</div>
								<div className="ss-time">{ch1Prod.time}</div>
							</section>

							<section>
								<div>
									<h2>DST Test</h2>
								</div>
								<div>
									<em>Spectra</em> <strong>{dstTest.version}</strong>
								</div>
								<div>
									Grape{' '}
									<span role="img" aria-label="grape">
										🍇
									</span>
									<i className={dstTest.grapeStatus}>{dstTest.grapeStatus}</i>
								</div>
								<div>
									Mango{' '}
									<span role="img" aria-label="mango">
										🍊
									</span>
									<i className={dstTest.mangoStatus}>{dstTest.mangoStatus}</i>
								</div>
								<div className="ss-memory">
									Memory
									<section>
										<div>
											<em>Total</em>
											<strong>{dstTest.memory.total} MB</strong>
										</div>
										<div>
											<em>Free</em>
											<strong>{dstTest.memory.free} MB</strong>
										</div>
										<span
											className={classNames('ss-progress', {
												red: dstTest.memory.percentage > 70,
												warning: dstTest.memory.percentage > 40,
												error: dstTest.memory.percentage === 0,
											})}
										>
											<i style={{ width: `${dstTest.memory.percentage}%` }} />
										</span>
									</section>
								</div>
								<div className="ss-time">{test.time}</div>
							</section>
							<section>
								<div>
									<h2>DST Prod</h2>
								</div>
								<div>
									<em>Spectra</em> <strong>{dstProd.version}</strong>
								</div>
								<div>
									Grape{' '}
									<span role="img" aria-label="grape">
										🍇
									</span>
									<i className={dstProd.grapeStatus}>{dstProd.grapeStatus}</i>
								</div>
								<div>
									Mango{' '}
									<span role="img" aria-label="mango">
										🍊
									</span>
									<i className={dstProd.grapeStatus}>{dstProd.mangoStatus}</i>
								</div>
								<div className="ss-memory">
									Memory
									<section>
										<div>
											<em>Total</em>
											<strong>{dstProd.memory.total} MB</strong>
										</div>
										<div>
											<em>Free</em>
											<strong>{dstProd.memory.free} MB</strong>
										</div>
										<span
											className={classNames('ss-progress', {
												red: dstProd.memory.percentage > 70,
												warning: dstProd.memory.percentage > 40,
												error: dstProd.memory.percentage === 0,
											})}
										>
											<i style={{ width: `${dstProd.memory.percentage}%` }} />
										</span>
									</section>
								</div>
								<div className="ss-time">{dstProd.time}</div>
							</section>
						</div>
					)}
					<div className="ss-github">
						<a
							href="https://github.com/luangjokaj/spectra-status"
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
