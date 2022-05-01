import React, { useState } from 'react';
import axios from 'axios'; 
import { StatusCodes as HttpStatus } from 'http-status-codes';
import RestaurantList from './RestaurantList';

const BASE_URL = 'http://localhost:8080';
const SEARCH_RESTAURANTS_BY_CITY_URL = '/api/v1/restaurants';

const getRestaurantsByCity = async (city) => {
	return axios.get(`${BASE_URL}${SEARCH_RESTAURANTS_BY_CITY_URL}/${city}`);
};

const SearchRestaurants = () => {
	const [searchInput, setSearchInput] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [city, setCity] = useState('');

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
	console.log(searchInput);
	console.log(searchResults);

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
					city={city}
				/>
			}
		</div>
	);
};

export default SearchRestaurants;