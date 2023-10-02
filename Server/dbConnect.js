const mongoose = require('mongoose');

module.exports = async() => {
    const mongoUri = process.env.MOONGO_URI
    try {
         await mongoose.connect(mongoUri, {
            useUnifiedTopology : true,
            useNewUrlParser : true,
        }); 
        
        console.log( `Connected`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    
}