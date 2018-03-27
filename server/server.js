const express = require('express');
const userRouter = require('./user');
const PORT = 9093;
const app = express();
app.use('/user', userRouter);
app.listen(PORT, function () {
    console.log(`Node App start at port ${PORT}`);
});
