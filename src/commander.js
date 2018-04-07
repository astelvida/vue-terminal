import {
    getGithubReposHtml,
    getMediumPostsHtml,
    getMediumTopicsHtml,
    handleRequestError,
    GIT_BASE_URL,
    MEDIUM_BASE_URL,
} from './medium+git';

import { PROD_HUNT_DEV_TOKEN } from '../api.config.js'

const parseArgs = (args) => args.length ? args.join(' ').trim() : '';

const getRequest = ({ url, query, getter }) => 
    fetch(url)
        .then((resp) => resp.json())
        .then(({ items }) => getter({ items, query }))
        .catch((err) => handleRequestError(err, query));

const commander = (context) => ({
    echo(args) {
        return args.join(' ') || '\n';
    },
    
    clear() {
        context.history = [];
        return null;
    },

    ph(args) {
        const query = parseArgs(args);

        const API_URL = 'https://api.producthunt.com/v1';
        const headers = { Authorization: `Bearer ${PROD_HUNT_DEV_TOKEN}` };

        return fetch(`${API_URL}/posts/${query || 'all'}`, { headers })
            .then(resp => resp.json())
            .then(json => {
                console.log('Fetched data!', json.posts.slice(0, 5));
                return json.posts.slice(0, 5);
            })
            .catch(err => {
                console.error(err);
                return [];
            })
    },

    git(args) {
        const query = parseArgs(args);
        const url = `${GIT_BASE_URL}?q=${query || 'created:%3E2018-03-06+language:javascript&sort=stars&order=desc'}`
        return getRequest({ url, query, getter: getGithubReposHtml });
    },

    medium(args) {
        const renderResults = ({ endpoint, query, getter }) => {
            const url = `${MEDIUM_BASE_URL}/${endpoint}?q=${query}`;
            return getRequest({ url, query, getter });
        } 

        const query = parseArgs(args);
        
        const optionsObj =
            query === '' ? { endpoint: 'topics', query: 'random', getter: getMediumTopicsHtml } :
            query === 'topics' ? { endpoint: 'topics', query: 'all', getter: getMediumTopicsHtml } :
            { endpoint: 'posts', query, getter: getMediumPostsHtml }
        
        return renderResults(optionsObj)
    },

    help() {
        const header = `<span style="color:gray">List of available commands:</span></br></br>`;
        const commands = Object.keys(this)
            .filter(cmd => cmd !== 'default' && cmd !=='help')
            .join('</br></br>');
        return header + commands;
    },  
    
    default() {
        return 'type `help` for a list of available commands';
    },
})

export default commander;