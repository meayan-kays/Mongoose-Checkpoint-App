const mongoose = require('mongoose')
const config = require('config')

const connectDB = () => {
    mongoose.connect(config.get('MONGO_URI'), {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('Database successful connection')
        })
        .catch(() => {
            console.error('Database error connection')
        })
} 

module.exports = connectDB