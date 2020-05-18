const express = require('express');
const bodyParser = require('body-parser');

const userRoute = require('./routes/userRoutes');

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json...used with Insomia
app.use(bodyParser.json())

userRoute(app);

app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1>');
})

app.listen(port, () => console.log('Api Rodando na Porta: ' + port));
