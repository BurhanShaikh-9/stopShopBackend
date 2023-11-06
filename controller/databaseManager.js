const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017';

const dbConnection = async () => {
    try {
        await  mongoose.connect(mongoURI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }).then((con) => {
                console.log("DB is connected", con.connection.host);
            })
    }
    catch(error){
        console.log('DB is not connected', error);
    }
}
module.exports = dbConnection