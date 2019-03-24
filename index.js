const app = require('express')();

app.get('/', (req,res) => {
    res.send('Timestamp microservice is working!');
});

app.listen('8000', () => {
    console.log('listening port 8000');
});