const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const app = express();

app.use(express.json());
app.use('/auth', require('./routes/auth.router'));
app.use('/counter', require('./routes/counter.router'));


const PORT = config.get('port') || 5000;

async function start(){
    try {
        await mongoose.connect(config.get('dbUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (error) {
        console.log('Error on starting server', error);
    }
}


start();