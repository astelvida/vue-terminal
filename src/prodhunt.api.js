import { PROD_HUNT_DEV_TOKEN } from '../api.config.js'

const API_URL = 'https://api.producthunt.com/v1';
const headers = { Authorization: `Bearer ${PROD_HUNT_DEV_TOKEN}` };

const endpoints = ['all'];

const fetchPosts = (endpoint) => {
    return fetch(`${API_URL}/posts/${endpoint}`, { headers })
        .then(resp => resp.json())
        .then(json => json.posts)
        .catch(err => {
            console.error(err.message);
            return [];
        })
}

export {
    fetchPosts,
}

