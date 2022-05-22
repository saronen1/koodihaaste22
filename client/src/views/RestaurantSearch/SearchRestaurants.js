import React, { useState } from 'react';
import { StatusCodes as HttpStatus } from 'http-status-codes';
import { SEARCH_RESTAURANTS_BY_CITY_URL } from '../../utils/apiUrls';
import client from '../../utils/client';
import RestaurantList from './RestaurantList';

const getRestaurantsByCity = async (city) => {
	return client.get(`${SEARCH_RESTAURANTS_BY_CITY_URL}/${city}`);
};

const SearchRestaurants = () => {
	const [searchInput, setSearchInput] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [city, setCity] = useState('');
	const [votedRestaurantId, setVotedRestaurantId] = useState();

	// TODO: valmis lista Suomen kunnista, josta ehdotukset
	// vapaasanahaun perusteella?
	const searchRestaurantsByCity = (e) => {
		e.preventDefault();
		getRestaurantsByCity(searchInput)
			.then((response) => {
				console.log(response);
				if (response?.status === HttpStatus.OK
					&& response?.data) {
					setSearchResults(response.data.restaurants || []);
					setVotedRestaurantId(response.data.alreadyVoted || null);
					setCity(searchInput);
					setSearchInput('');
				} else {
					// Tietojen haku ei onnistunut
				}
			})
			.catch((error) => {
				console.log('ERROR: ', error);
			});
	};
	// console.log(searchInput);
	// console.log(searchResults);

	return (
		<div>
			<p>Syötä kaupunki:</p>
			<form onSubmit={searchRestaurantsByCity}>
				<input 
					type="text"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<input type="submit" value="Hae"/>
			</form>
			{searchResults.length > 0 &&
				<RestaurantList 
					restaurants={searchResults}
					votedRestaurantId={votedRestaurantId}
					setVotedRestaurantId={setVotedRestaurantId}
					city={city}
				/>
			}
		</div>
	);
};

export default SearchRestaurants;