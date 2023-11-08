const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const dbConnection  = require('./src/controller/databaseManager')
dbConnection();
const userRoute = require('./src/routes/user');
const adminRoute = require('./src/routes/admin')
const signInRoute = require('./src/routes/signIn')

const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors({origin: '*'}));
app.get('/', (req, res) => {res.send("server is running")})

app.use('/api/', userRoute); 
app.use('/api/', adminRoute); 
app.use('/api/', signInRoute); 


app.listen(port, () => {console.log(`Server is running on port ${port}`)}); 
