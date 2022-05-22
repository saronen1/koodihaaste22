import React from 'react';
import PropTypes from 'prop-types';
import RestaurantItem from './RestaurantItem';

const RestaurantList = ({ restaurants, votedRestaurantId, setVotedRestaurantId, city }) => {
	return (
		<div>
			<p>Hakutulokset kaupungille {city}:</p>
			<ul>
				{restaurants.map((restaurant) => {
					return (
						<li key={restaurant.id}>
							<RestaurantItem
								restaurant={restaurant}
								votedRestaurantId={votedRestaurantId}
								setVotedRestaurantId={setVotedRestaurantId}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

RestaurantList.propTypes = {
	restaurants: PropTypes.array,
	votedRestaurantId: PropTypes.string,
	setVotedRestaurantId: PropTypes.func,
	city: PropTypes.string,
};

export default RestaurantList;