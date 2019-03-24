const express = require('express');
const app = express();

app.get('/api/timestamp/:dateString?', (request,response) => {
    const dateString = request.params.dateString;
    let date;

    //If the date string is empty it should be equivalent to trigger new Date(), i.e. the service uses the current timestamp.
    if(!dateString){
        date= new Date();
    }
    //non-empty string
    else{
        //if string is a number then convert it to integer
        if(!isNaN(dateString)){
            date = new Date(parseInt(dateString));
        }
        else{
            date = new Date(dateString);
        }
    }

    // If the date string is invalid the api returns a JSON having the structure {"error" : "Invalid Date" }.
    if(date.toString() === 'Invalid Date'){
        response.json({ error: 'Invalid Date'})
    }
    //If the date string is valid the api returns a JSON having the structure {"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
    else{
        response.json({ unix: date.getTime() , utc : date.toUTCString() });
    }
});

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

app.listen('8000', () => {
    console.log('listening port 8000');
});