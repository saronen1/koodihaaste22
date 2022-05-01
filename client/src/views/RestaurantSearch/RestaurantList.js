import React from 'react';
import PropTypes from 'prop-types';
import RestaurantItem from './RestaurantItem';

const RestaurantList = ({ restaurants, city }) => {
	return (
		<div>
			<p>Hakutulokset kaupungille {city}:</p>
			<ul>
				{restaurants.map((restaurant) => {
					return (
						<li key={restaurant.id}>
							<RestaurantItem
								restaurant={restaurant}/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

RestaurantList.propTypes = {
	restaurants: PropTypes.array,
	city: PropTypes.string,
};

export default RestaurantList;