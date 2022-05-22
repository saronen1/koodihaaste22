import axios from 'axios';
import { BASE_URL } from './apiUrls';

const client = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
	withCredentials: true,
});

export default client;