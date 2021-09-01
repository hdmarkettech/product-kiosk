const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const contentful = require("contentful");
const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "2ghynd99kuvs",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: process.env.CONTENTFUL_API_KEY
});

app.use(express.static(path.join(__dirname, 'build')));
app.get('/api/home', function (req, res) {
    client
        .getEntries({'content_type': 'home'})
        .then(entry => {
            console.log('entry', entry)
            return res.send(entry.items[0].fields);
        })
});
app.get('/api/product-categories', function (req, res) {
    let param = req.query.name;
    console.log('param', param)
    client
        .getEntries({'content_type': 'productCategories', 'query': param})
        .then(entry => {
            console.log('entry', entry)
            let data = {fields: entry.items[0].fields, includes: entry.includes};
            return res.send(data);
        })
});
app.get('/api/paths', function (req, res) {
    let param = req.query.name;
    console.log('param', param)
    client
        .getEntries({'content_type': 'categoryPages', 'query': param})
        .then(entry => {
            console.log('entry', entry)
            let data = {fields: entry.items[0].fields, includes: entry.includes};
            return res.send(data);
        })
});
app.get('/api/products', function (req, res) {
    client
        .getEntries({'content_type': 'products'})
        .then(entry => {
            console.log('entry', entry)
            let data = {fields: entry.items[0].fields, includes: entry.includes};
            return res.send(data);
        })
});
app.get('/api/productPages', function (req, res) {
    let param = req.query.name;
    console.log('param', param)
    client
        .getEntries({'content_type': 'productPages', 'fields.name[match]': param})
        .then(entry => {
            console.log('entry', entry)
            let data = {fields: entry.items[0].fields, includes: entry.includes};
            return res.send(data);
        })
});
app.get('/api/benefits', function (req, res) {
    let param = req.query.name;
    console.log('param', param)
    client
        .getEntries({'content_type': 'benefit', 'query': param})
        .then(entry => {
            console.log('entry', entry)
            let data = {fields: entry.items[0].fields, includes: entry.includes};
            return res.send(data);
        })
});
app.get('/api/photos/:room', function (req, res) {
    let room = req.params.room;
    client
        .getEntries({'content_type': 'room', 'query': room})
        .then(entry => {
            console.log('entry', entry)
            let data = {fields: entry.items[0].fields, includes: entry.includes};
            return res.send(data);
        })
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, err => {
    if (err) throw err;
    console.log(`Ready on port ${port}`)
});
