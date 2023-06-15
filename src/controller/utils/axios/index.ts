import axios from 'axios';
const BASE_URL = 'https://dummyjson.com';

export const instance = axios.create({
	baseURL: BASE_URL,
  headers: {
		'Content-Type': 'application/json'
	},
});
