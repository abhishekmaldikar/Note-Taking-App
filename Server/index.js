const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect');
const notesRouters = require('./routers/notesRouters')
const morgan = require('morgan');
const cors = require('cors')
dotenv.config('./.env');


const app = express();


app.use(express.json());
app.use(morgan('common'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

app.use('/posts', notesRouters);

app.get('/',(req , res) =>{
    res.status(200).send({
        'hello' : "4000"
    })
})

const PORT = process.env.PORT || 4001;

dbConnect();

app.listen(PORT , () => {
    console.log(`listening on port: ${PORT}`);
});