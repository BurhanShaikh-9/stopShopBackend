
const express = require('express');
const app = express();
const cors = require('cors');
const dbConnection  = require('./controller/databaseManager')
app.use(cors({
    origin: '*',
}));

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("server is running")
})

dbConnection();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
