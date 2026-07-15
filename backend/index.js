const express = require('express')
const app = express()
const port = 5000
const mongoDB = require("./db");
mongoDB();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://food-delivery-mern-1-36xu.onrender.com");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!----')
})
app.use(express.json());
app.use('/api/', require("./Routes/CreatUser"));
app.use('/api/', require("./Routes/DisplayData"));
app.use('/api/', require("./Routes/OrderData"));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})