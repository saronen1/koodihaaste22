import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { VOTE_RESTAURANT_URL } from '../../utils/apiUrls';
import client from '../../utils/client';

const RestaurantItem = ({ restaurant, votedRestaurantId, setVotedRestaurantId }) => {
	const voteOrRemoveVote = (restaurantId) => {
		const isRemovingVote = votedRestaurantId === restaurantId;
		client.post(`${VOTE_RESTAURANT_URL}/${restaurantId}`)
			.then((response) => {
				console.log(response);
				if (isRemovingVote) {
					setVotedRestaurantId(null);
				} else {
					setVotedRestaurantId(restaurantId);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<p>{restaurant.name}</p>
			<Button onClick={() => voteOrRemoveVote(restaurant.id)}>
				{votedRestaurantId === restaurant.id ? 'Poista ääni' : 'Äänestä'}</Button>
		</div>
	);
};

RestaurantItem.propTypes = {
	restaurant: PropTypes.object,
	votedRestaurantId: PropTypes.string,
	setVotedRestaurantId: PropTypes.func,
};

export default RestaurantItem;