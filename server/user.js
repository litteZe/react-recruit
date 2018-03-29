const express = require('express');
const Router = express.Router();
const utils = require('utility');
const models = require('./model');

const User = models.getModel('user');
const Chat = models.getModel('chat');

const _filter = {
    'pwd': 0,
    '__v': 0
};

Router.get('/list', (req, res) => {
    const {
        type = 'genius'
    } = req.query;
    User.find({
        type
    }, (err, doc) => {
        if (err) 
            return res.json({code: 1, msg: '后端出错'});
        return res.json({code: 0, data: doc});
    });
});

Router.post('/login', (req, res) => {
    const {user, pwd} = req.body;
    User.findOne({
        user,
        pwd: md5Pwd(pwd)
    }, _filter, (err, doc) => {
        if (!doc) {
            return res.json({code: 1, msg: '用户名或密码错误'});
        }
        res.cookie('userid', doc._id);
        return res.json({code: 0, data: doc});
    });
});

Router.post('/register', (req, res) => {
    console.log(req.body);
    const {user, pwd, type} = req.body;
    User.findOne({
        user
    }, _filter, (err, doc) => {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复'});
        }
        const userModel = new User({user, pwd: md5Pwd(pwd), type});
        userModel.save((e, d) => {
            if (e) {
                return res.json({code: 1, msg: '后端出错'});
            }
            const {user, type, _id} = d;
            res.cookie('userid', _id);
            return res.json({
                code: 0,
                data: {
                    user,
                    type,
                    _id
                }
            });
        });
    });
});

Router.post('/update', (req, res) => {
    const {userid} = req.cookies;
    if (!userid) {
        return res.json({code: 1});
    }
    User.findByIdAndUpdate(userid, req.body, (err, doc) => {
        const data = {
            ...req.body,
            user: doc.user,
            type: doc.type
        };
        return res.json({code: 0, data});
    });
});

Router.get('/info', (req, res) => {
    const {userid} = req.cookies;
    if (!userid) {
        return res.json({code: 1});
    }
    User.findOne({
        _id: userid
    }, _filter, (err, doc) => {
        if (err) {
            return res.json({code: 1, msg: '后端出错'});
        }
        return res.json({code: 0, data: doc});
    });
});

Router.get('/getmsglist', (req, res) => {
    const {userid} = req.cookies;
    // {'$or':[{from: user,to: user}]}
    User.find({}, (err, userdoc) => {
        let users = {};
        userdoc.forEach(v => {
            users[v._id] = {
                name: v.user,
                avatar: v.avatar
            }
        });
        Chat.find({
            '$or': [
                {
                    from: userid
                }, {
                    to: userid
                }
            ]
        }, (err, doc) => {
            if (!err) {
                return res.json({code: 0, msgs: doc, users: users});
            }
        });
    });
});

Router.post('/readmsg', (req, res) => {
    const {userid} = req.cookies;
    const {from} = req.body;
    Chat.update({
        from,
        to: userid
    }, {
        '$set': {
            read: true
        }
    }, {
        'multi': true
    }, (err, doc) => {
        if (!err) 
            return res.json({code: 0, num: doc.nModified});
        return res.json({code: 1, msg: '修改失败'});
    })
});

function md5Pwd(pwd) {
    const salt = 'Iama handsome boy@x86_64123456lu;j.;lk;jlhk';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;
