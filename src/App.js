import logo from './logo.png';
import './App.css';

import React, { useEffect, useState } from 'react';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';

function App() {
	const [servers, setServers] = useState([]);
	useEffect(() => {
		fetch('https://yuniiworks.de:5033/servers')
			.then(response => response.json())
			.then(data => setServers(data))
			.catch(error => console.log(error));
	}, []);

	function calcRoundTimeLength(startTime, running) {

		if (running != 1) return "In the Lobby";
		else {
			const startTimeDate = new Date(startTime);
			const currentTime = new Date();

			const timeDifference = currentTime.getTime() - startTimeDate.getTime();

			// return in format: 1 Hour, 23 Minutes, 45 Seconds
			return `${Math.floor(timeDifference / 1000 / 60 / 60)} Hours, ${Math.floor(timeDifference / 1000 / 60) % 60} Minutes, ${Math.floor(timeDifference / 1000) % 60} Seconds`;

		}
	}

	return (
		<div className="App">
			<header className="header">
				<div className="logo">
					<img src={logo} className="headerLogo" alt="logo" />
					<span className="headerText">Wizard's Den Server Dashboard</span>
				</div>

				<div className="refreshButton">
					<button onClick={() => window.location.reload(false)} className='refresh'>Refresh</button>
				</div>
			</header>

			<main>
				<div className="cardContainer">
					{
						servers.map((server, index) => (
							<div className='card' key={index}>
								<div className='leftContainer'>
									<div className="cardHeader">
										<span className="cardTitle">{server.name}</span><br />
										<span className="cardPlayers">{server.players} / {server.soft_max_players} Players</span><br />
									</div>
									<div className="cardBody">
										<div className="cardStatus">
											<span className="cardStatusText">{server.status}</span><br />
										</div>
										<div className="cardFooter">
											<span className="serverMap">Station: {server.map ? server.map : "Error fetching Map"}</span><br />
											<span className="serverRuntime">{calcRoundTimeLength(server.round_start_time, server.run_level)}</span><br />
										</div>
									</div>
								</div>
								<div className='rightContainer'>
									<div className="cardFooter">
										<span className="serverRoundNr">Shift Nr. #{server.round_id}</span><br />
										<div className="serverTags">
											{server.tags.map((tag, index) => (
												<span className="serverTag" key={index}>
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						))
					}
				</div>
			</main >

			<footer>
				<p className="footerText">Made with 💜 by YuNii</p>
				<p className="footerText">✨ Play Space Station 14 ✨</p>
			</footer>
		</div >
	);
}

export default App;
