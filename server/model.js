const mongoose = require('mongoose');

const DB_URL = 'mongodb://pyyzcwg2833:pyyzcwg2833@ds028559.mlab.com:28559/react-recruit';

mongoose.connect(DB_URL);

const models = {
    user: {
        'user': {
            type: String,
            require: true
        },
        'pwd': {
            type: String,
            require: true
        },
        'type': {
            type: String,
            require: true
        },
        'avatar': {
            type: String,
            require: false
        },
        'desc': {
            type: String,
            require: false
        },
        'title': {
            type: String,
            require: false
        },
        'company': {
            type: String
        },
        'money': {
            type: String
        }
    },
    chat: {
        'chatid': {
            type: String,
            require: true
        },
        'from':{
            type: String,
            require: true
        },
        'to':{
            type: String,
            require: true
        },
        'content': {
            type: String,
            require: true,
            default: ''
        },
        'read': {
            type: Boolean,
            default: false
        },
        'create_time': {
            type: Number,
            default: Date.now()
        }
    }
};

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel(name) {
        return mongoose.model(name);
    }
};
