import marked, { Renderer } from 'marked';
import axios from 'axios';

const generateHtml = (getter) => (items, heading) => {
    const header = `<div><strong><span>${heading}</span></strong></div>`;
    const results = items.map((item, i) => `
        <div style="margin:5px 0">
            ${getter(item, i)}
        </div>`
    ).slice(0, 5).join('\n');

    return `<div class="api-results">` + header + results + `<div>`;
}

function getMediumItem(item) {
        return `
            <a href="https://medium.com/${item.username}/${item.slug}"><span style="color:hotpink">${item.title}</span></a>
            </br>
            <span style="">${Math.ceil(item.virtuals.readingTime)} min read</span> |
            <span style="">${item.virtuals.totalClapCount} 👏  | </span>
            <span style="">${new Date(item.createdAt).toDateString().split(' ').slice(1).join(' ')}</span>
        `;
}

function getGitItem(item, i) {
    return `
        <span style="color:springgreen">#${i + 1}</span>
        <span><a href="${item.html_url}">${item.name}</a></span>
        <span style="color: gold">[${item.stargazers_count} ✨]</span>
        </br>
        <span>${item.description}</span>
    `;
}
const getGitHtml = generateHtml(getGitItem);
const getMediumHtml = generateHtml(getMediumItem);

const BASE_URL = 'http://localhost:8001'

const commander = (context) => ({
    echo(args) { 
        return args.join(' ');
    },
    clear(args) {
        context.history = [];
        return null;
    },

    git(args) {
        let gitUrl;
        let title;

        if (!args || !args.length) {
            gitUrl = 'https://api.github.com/search/repositories?q=created:%3E2018-03-06+language:javascript&sort=stars&order=desc';
            title = 'Hot new repos this week'
        } else {
            const q = args.map(arg => arg.trim()).join('-');
            gitUrl = `https://api.github.com/search/repositories?q=${q}+language:javascript&sort=stars&order=desc`;
            title = `Popular repos tagged "${q}"`;
        }

        return fetch(gitUrl)
            .then(resp => resp.json())
            .then(data => getGitHtml(data.items, title))
    },

    awesome() {
        return axios.get(`${BASE_URL}/api/vue-awesome`)
            .then(resp => marked(resp.data));
    },
    default() {
        // return random();≤
    },

    medium() {
        return axios.get(`${BASE_URL}/api/medium`)
            .then(resp => getMediumHtml(resp.data, 'Vue Medium posts - Top picks'));
    },

})

export default commander;