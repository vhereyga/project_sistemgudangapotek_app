const db = require('../config/database');

const User = {
    getAll: callback => db.query('SELECT * FROM users', callback),
    create: (user, callback) => db.query('INSERT INTO users SET ?', user, callback),
    update: (id, updatedData, callback) => db.query('UPDATE users SET ? WHERE id = ?', [updatedData, id], callback),
    delete: (id, callback) => db.query('DELETE FROM users WHERE id = ?', [id], callback),
    getByUsername: (username, callback) => db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]);
    }),
};

module.exports = User;
