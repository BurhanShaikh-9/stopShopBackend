const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const dbConnection  = require('./controller/databaseManager')
dbConnection();
const userRoute = require('./routes/user');

const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(cors({origin: '*'}));
app.get('/', (req, res) => {res.send("server is running")})

app.use('/api/', userRoute); 


app.listen(port, () => {console.log(`Server is running on port ${port}`)}); 
