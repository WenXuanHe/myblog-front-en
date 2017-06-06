let mysql = require('mysql');

module.exports = () => {
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database:'blog'
    });
    return new Promise(function(resolve, reject){
        connection.connect((err) => {
            if (err) {
                reject(err);
            }else{
                resolve(connection);
            }
        });
    })
    .catch(function(err){
        console.error('error connecting: ' + err.stack);
    });
};