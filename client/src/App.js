import './App.css';
import SearchRestaurants from './views/RestaurantSearch/SearchRestaurants';
import Results from './views/Results/Results';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Navbar/>
			<Routes>
				<Route path="/tulokset" element={<Results/>}/>
				<Route path="/aanesta" element={<SearchRestaurants/>}/>
				<Route path="*" element={<Navigate to="/aanesta"/>}/>
			</Routes>
		</Router>
	);
}

export default App;
