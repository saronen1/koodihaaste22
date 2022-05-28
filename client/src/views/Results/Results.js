import React, { useEffect, useState } from 'react';
import { TODAYS_VOTING_RESULTS_URL } from '../../utils/constants';
import client from '../../utils/client';
import { StatusCodes as HttpStatus } from 'http-status-codes';

const getResults = async () => {
	return client.get(TODAYS_VOTING_RESULTS_URL); 
};

const Results = () => {
	const [results, setResults] = useState([]);

	const updateResults = () => {
		console.log('Fetching results!');
		getResults()
			.then((response) => {
				if (response.status === HttpStatus.OK) {
					setResults(response.data?.results);
				} else {
					// unexpected reply
				}
			})
			.catch((error) => {
				console.log(error);
				// TODO: Snackbar: could not fetch results
			});
	};

	// Fetches results immediately when view is rendered
	useEffect(() => {
		console.log('First useEffect');
		updateResults();
	}, []);

	// Updates results every 10 seconds
	useEffect(() => {
		console.log('Second use effect');
		const timer = setInterval(() => {
			console.log('Another interval');
			updateResults();
		}, 10000);
		// stops updating results when component unmounts
		return () => clearInterval(timer);
	}, []);

	return (
		<div>
			<h1>Tulokset</h1>
			<ul>
				{results && results.map((result) => {
					return(
						<li key={result.restaurantId}>
							{result.name}, ääniä: {result.votes}
						</li>
					);
				})
				} 
			</ul>
		</div>
	);
};

export default Results;