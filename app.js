// Server setup adapted from the following tutorial:
// https://levelup.gitconnected.com/set-up-and-run-a-simple-node-server-project-38b403a3dc09
// All other code by August Connolly for UCD COMP47930 Fall 2022
// This system was used for testing my app locally, but is not used in the final version of the project hosted on GitHub Pages
// Site is live at: https://aconnolly2.github.io/XR-Assignment1/

// Listen on a specific host via the HOST environment variable (localhost)
var host = process.env.HOST || '127.0.0.1';
// Listen on a specific port via the PORT environment variable (8080 for proxy server)
var proxyport = process.env.PORT || 8080;

// Set up our cors_proxy server on 8080
var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(proxyport, host, () => {
    console.log('Running CORS Anywhere on ' + host + ':' + proxyport);
});

// Set up our local server for actually running the app.
const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening

// Attempt to define mime type for gltf so that I could use local file references. No luck.
express.static.mime.define({'model/gltf+json': ['gltf']});
app.use(express.static('./assets'));

// Launches our app server on 5000
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

// This was an attempt to get the local file server working, but didn't seem successful.
app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});