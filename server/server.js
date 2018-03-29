const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const userRouter = require('./user');
const models = require('./model');
// const User = models.getModel('user');
const Chat = models.getModel('chat');
// const User = models.getModel('user');
const PORT = 9093;
// Chat.remove({},()=>{});
// User.remove({},()=>{});
io.on('connection', socket => {
    socket.on('sendmsg', data => {
        const {from, to, msg} = data;
        const chatid = [from, to]
            .sort()
            .join('_');
        Chat.create({
            chatid,
            from,
            to,
            content: msg
        }, (err, doc) => {
            console.log(doc);
            io.emit('recvmsg', doc);
        });
    });
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);
server.listen(PORT, function () {
    console.log(`Node App start at port ${PORT}`);
});
