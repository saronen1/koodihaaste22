import React, { useState } from 'react';
import { StatusCodes as HttpStatus } from 'http-status-codes';
import { SEARCH_RESTAURANTS_BY_CITY_URL, cities } from '../../utils/constants';
import client from '../../utils/client';
import RestaurantList from './RestaurantList';
import { Autocomplete, Button, TextField } from '@mui/material';

const getRestaurantsByCity = async (city) => {
	return client.get(`${SEARCH_RESTAURANTS_BY_CITY_URL}/${city}`);
};

const SearchRestaurants = () => {
	const [searchInput, setSearchInput] = useState(null);
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
					setSearchInput(null);
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
			<Autocomplete
				id="restaurant-city-search"
				value={searchInput}
				onChange={(event, newValue) => setSearchInput(newValue)}
				options={cities}
				getOptionLabel={(option) => option}
				renderInput={(params) => 
					<TextField {...params} label="Hae kaupunkia..."/>
				}
				noOptionsText="Ei tuloksia"
			/>
			<Button 
				onClick={searchRestaurantsByCity}
				variant="contained"
			>
					Hae
			</Button>
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