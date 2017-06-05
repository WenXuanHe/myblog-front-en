let mysql = require('mysql');

module.exports = ({ host, user, password, database}) => {

    let connection = mysql.createConnection({
        host: database,
        user: user,
        password: password,
        database: database
    });

    connection.connect( (err) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });

    return connection;
};