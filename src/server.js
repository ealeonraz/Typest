const express = require('express');
const path = require('path')

const app = express();

const publicPath = path.join(__dirname, '..', 'public');

const PORT = process.env.PORT || 8080;

// Serve static files from the public directory
app.use(express.static(publicPath));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT);
