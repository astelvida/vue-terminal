const GIT_BASE_URL = 'https://api.github.com/search/repositories';
const MEDIUM_BASE_URL = `https://medium-unofficial.now.sh/api`;

const generateHtml = (itemGetter, titleGetter) => ({ items, query }) => {
    if (!items || items.length === 0) {
        return renderNotFound(query);
    }
    const header = `<span>* <strong>${titleGetter(query)}</strong> *</span>`;
    const list = items.map((item, i) => `<li>${itemGetter(item, i)}</li>`);
     
    return header + `<ul>${list.join('')}</ul>`;
}

const getMediumPostItem = (item) => `
    <a href="https://medium.com/${item.collection}/${item.uniqueSlug}">
        <span style="color:hotpink">${item.title}</span>
    </a>
    </br>
    <span>${item.username} - </span>
    <span class="dimmed">
        ${item.virtuals.totalClapCount} | 
        ${Math.ceil(item.virtuals.readingTime)} min read |
        ${new Date(item.createdAt).toDateString().split(' ').slice(1).join(' ')}\
    </span>
`;

const getGitRepoItem = (item, index) => `
    <span style="color:springgreen">#${index + 1}</span>
    <span><a href="${item.html_url}">${item.name}</a></span>
    <span style="color: gold">[${item.stargazers_count} ✨]</span>
    </br>
    <span>${item.description}</span>
`;

const getMediumTopicItem = (item) =>
    `<span>${item.name} - </span>` +
    `<span class="dimmed">${item.description}</span>`;

const highlight = (content) => `<span style="color:turquoise">${content}</span>`;

const getMediumPostsHeader = (content) => content ? 
    'Tagged in ' + highlight(content) + ' - Top Stories' :
    'Hot Software Engineering Stories';

const getGitHeader = (content) => content ? 
    'Search results for ' + highlight(content) +' - Popular Repos' : 
    'Hot Repos This Week';

const getMediumTopicsHeader = (content) =>
    content === 'random' ?  `Some Random Topics` : `Browse All Topics` ;

const getGithubReposHtml = generateHtml(getGitRepoItem, getGitHeader);
const getMediumPostsHtml = generateHtml(getMediumPostItem, getMediumPostsHeader);
const getMediumTopicsHtml = generateHtml(getMediumTopicItem, getMediumTopicsHeader);

const renderNotFound = (content) => `No results found ${content ? `for ${content}` : ''}`
const handleRequestError = (err, content) => {
    console.log('Error!', err.message);
    return renderNotFound(content);
}

export {
    getGithubReposHtml,
    getMediumPostsHtml,
    getMediumTopicsHtml,
    handleRequestError,
    GIT_BASE_URL,
    MEDIUM_BASE_URL,
};