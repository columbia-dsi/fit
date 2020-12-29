var User = require('../models/User');

var controller = {
    createUser: function(user, cb){
        console.time('createUser');
        var newUser = new User({
            name:user.name,
            email: user.email,
            insider: user.insider,
            feedbacks: user.feedbacks,
            human: user.human,
            guid: user.guid
        });
        newUser.save(function (err) {
            if (err) {
                console.log(err);
                console.timeEnd('createUser');
                cb({status: 500, content: err});
            } else {
                console.log('createUser!');
                console.timeEnd('createUser');
                cb({status: 200, content: null});
            }
        });
    },

    findUsers: function (cb) {
        console.time('findUsers');
        User.find(function (err, users) {
            if (err) {
                console.error(err);
                console.timeEnd('findUsers');
                cb({status: 404, content: err});
            }else{
                console.log(users);
                console.timeEnd('findUsers');
                cb({status: 200, content: users});
            }
        });
    },

    findUserById: function (id, cb) {
        console.time('findUserById');
        User.find({ _id: id }, function(err, user){
            if (err) {
                console.error(err);
                console.timeEnd('findUserById');
                cb({status: 404, content: err});
            }else{
                console.log(user);
                console.timeEnd('findUserById');
                cb({status: 200, content: user});
            }
        });
    },

    findUserByName: function (name, cb) {
        console.time('findUserByName');
        User.find({ name: name }, function(err, user){
            if (err) {
                console.error(err);
                console.timeEnd('findUserByName');
                cb({status: 404, content: err});
            }else{
                console.log(user);
                console.timeEnd('findUserByName');
                cb({status: 200, content: user});
            }
        });
    }


    //...
}


module.exports = controller;