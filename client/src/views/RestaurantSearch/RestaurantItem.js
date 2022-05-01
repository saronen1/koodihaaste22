import React from 'react';
import PropTypes from 'prop-types';

const RestaurantItem = ({ restaurant }) => {
	console.log(restaurant);
	return (
		<div>
			<p>{restaurant.name}</p>
		</div>
	);
};

RestaurantItem.propTypes = {
	restaurant: PropTypes.obj,
};

export default RestaurantItem;