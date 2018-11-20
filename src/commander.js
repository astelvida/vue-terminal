import { PROD_HUNT_DEV_TOKEN } from '../api.config.js'

const PROD_HUNT_URL = 'https://api.producthunt.com/v1'
const GITHUB_URL = 'https://api.github.com/search/repositories'
const MEDIUM_URL = `https://medium-unofficial.now.sh/api` // NEEDS WORK

let commandList = []

const fetcher = (url, options) =>
  fetch(url, options)
    .then(resp => resp.json())
    .catch(err => {
      console.error(err)
      return `Nothing found :(`
    })

const defaultCommands = {
  echo (args) {
    return args
  },

  clear (args, context) {
    context.history = []
    return null
  },

  github (args) {
    const url = `${GITHUB_URL}?q=${args || 'created:%3E2018-03-06+language:javascript&sort=stars&order=desc'}`

    return fetcher(url)
      .then(json => ({
        items: json.items.slice(0, 5),
        title: args ? args + ' - popular repos' : 'Hottest repos this week',
        name: 'github'
      }))
  },

  prodhunt (args) {
    args = 'all'
    const url = `${PROD_HUNT_URL}/posts/${args}`
    const headers = { Authorization: `Bearer ${PROD_HUNT_DEV_TOKEN}` }

    return fetcher(url, { headers })
      .then(json => ({
        items: json.posts.slice(0, 5),
        title: 'Hottest products last month',
        name: 'prodhunt'
      }))
  },
  medium (args = 'javascript') {
    const url = `${MEDIUM_URL}/posts?q=${args}`
    return fetcher(url)
      .then(json => ({
        items: json.items.slice(0, 5),
        title: `top stories * ${args} *`,
        name: 'medium'
      }))
  },

  ls (args) {
    return {
      items: commandList
        .filter(cmd => cmd !== 'catchAll' && cmd !== 'help')
        .map(cmd => ({ name: cmd, id: cmd })),
      title: `Registered Commands`,
      name: 'help'
    }
  },

  catchAll (args) {
    return 'type `ls` for a list of available commands'
  }
}

// let commandList;
const commander = (customCommands = {}, context = {}) => {
  const commands = { ...defaultCommands, ...customCommands }
  commandList = Object.keys(commands)

  const get = command => commands[command] || commands['catchAll']

  return {
    run (command, args) {
      return Promise.resolve(get(command)(args, context))
    }
  }
}

export default commander
