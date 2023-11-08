const mongoose = require('mongoose');
const configs = require('../../constant')
const mongoURI = configs.mongoDbUrl;

const dbConnection = async () => {
    try {
        await mongoose.connect(mongoURI).then((con) => {
            console.log("DB is connected", con.connection.host);
        })
    }
    catch (error) {
        console.log('DB is not connected', error);
    }
}
module.exports = dbConnection