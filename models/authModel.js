path = require('path')
const db = require('../db')
var bcrypt = require('bcryptjs');
const fs = require('fs')
module.exports = class Users {
    constructor(user) {
        this.userData = user;
    }

    static save(user) {
        return db.query('INSERT INTO Users (' + Object.keys(user) + ', role_id) VALUES (?,?,?,?);', [user.email, user.password, user.name, 1]);
    };
    
    static fetchAll() {
        return db.execute('SELECT * FROM users')
    }
    static fetchByEmail(user) {
        console.log(user)
        return db.query('SELECT * FROM Users where email=?', [user]);
    }

    static fetchById(user) {
        return db.query('SELECT * FROM users where user_id=?', [user]);
    }

    static comparePassword(candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
            if (err) throw err;
            callback(null, isMatch);
        });
    }

}