import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';

const Navbar = () => {
	const location = useLocation();

	return (
		<Tabs value={location.pathname}>
			<Tab label="Äänestä" component={Link} to="/aanesta" value="/aanesta"/>
			<Tab label="Tulokset" component={Link} to="/tulokset" value="/tulokset"/>
		</Tabs>
	);
};

export default Navbar;