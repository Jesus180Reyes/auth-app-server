require('colors');
const mongoose = require('mongoose');
const dbConecction = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Base de datos Online'.green.underline.bold);

    } catch (error) {
        console.log(`${error}`.red.underline.bold);
        throw new Error('Error al conectar a la base de datos');
    }

}

module.exports = {
    dbConecction
}