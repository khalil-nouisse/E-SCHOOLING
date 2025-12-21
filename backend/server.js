const express = require('express');
const cors = require('cors');
const app = express();

const mainApiRouter = require('./routes/index')



const whiteList = ['http://localhost:5173', 'http://localhost:5174'];

const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        }

        else {
            callback(new Error('Not Allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', mainApiRouter)

app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`running on port ${PORT || 5000}`);
})