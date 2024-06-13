const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const dbConnection = require('./src/controller/databaseManager')
dbConnection();
const routeModules = [
    require('./src/routes/user'),
    require('./src/routes/admin'),
    require('./src/routes/signIn'),
    require('./src/routes/product'),
    require('./src/routes/cart'),
    require('./src/routes/dashboard'),
];

const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.get('/', (req, res) => { res.send("server is running") })


routeModules.forEach((routeModule) => {
    app.use('/api/', routeModule);
});

app.listen(port, () => { console.log(`Server is running on port ${port}`) }); 
