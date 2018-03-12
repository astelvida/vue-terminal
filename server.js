const WebSocket = require('ws');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const wsServer = new WebSocket.Server({ port: 5000 });

wsServer.on('connection', async function connection(ws) {

    async function command(message) {
        try {
            const { stderr, stdout } = await exec(message);
            stdout && ws.send(stdout);
        } catch(err) {
            ws.send(err.toString());
            return err;
        }
    }

    ws.on('message', command);

    try {
        const { stderr, stdout } = await exec('whoami');
        stdout && ws.send(`Hi, ${stdout}!`);
    } catch (err) {
        ws.send(`Something broke. restart your window`);
        throw err;
    }    
});
