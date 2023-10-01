const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000; 

app.set('view engine', 'ejs');

app.get('/', async(req, res) => {
    try{
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                limit: 10,
                lang: 'en',
                sparkline: false,
                price_change_percentage: '24h'
            }
        });
        res.render('prices', {coins: response.data});
    }catch{
        res.status(500).send("Failed to fetch data");
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});