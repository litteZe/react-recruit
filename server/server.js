const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');
const PORT = 9093;
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.listen(PORT, function () {
    console.log(`Node App start at port ${PORT}`);
});
