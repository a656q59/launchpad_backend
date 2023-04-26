const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const errorHandler = require('./handlers/error');
const cors = require('cors')
const programRoutes = require('./routes/program');
const PORT= 8081;


app.use(bodyParser.json());
app.use(cors());
app.use('/program',programRoutes);


app.use(function(req,res,next){
    let err = new Error("not found");
    err.status = 404;
    next(err);
})

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`server listening on ${PORT}`);
})